/// <reference path="./parser/rss-parser.d.ts" />

import {Component, Inject, OnInit} from '@angular/core';
import {FeedModel} from './parser/shared/feed.model';
import {RssService} from './parser/shared/rss.service';
import {from} from 'rxjs';
import {filter, map, toArray} from 'rxjs/operators';
import {RSSEntry,  RSSFeed} from 'rss-parser';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {NgxXml2jsonService} from 'ngx-xml2json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [RssService]
})

export class AppComponent implements OnInit {
    feeds: FeedModel[];
    feed: RSSFeed;
    notification: RSSEntry;
    inProgress = false;
    showOnlyUnreadNotifications = true;
    indexOfFeed = 0;

    public doughnutChartLabels = [];
    public doughnutChartData = [];

    constructor(private rssService: RssService,
                @Inject(LOCAL_STORAGE) private storage: WebStorageService,
                private http: HttpClient,
                private ngxXml2jsonService: NgxXml2jsonService) {
    }

    ngOnInit(): void {
        // load feed list
        this.rssService.getFeeds().then(feeds => this.feeds = feeds);
        // get stored state of view mode
        this.showOnlyUnreadNotifications = this.storage.get('only-unread');
    }

    /**
     * Get notifications from given feed link
     * @param index
     */
    loadNotifications(index) {
        this.indexOfFeed = index;
        this.inProgress = true;
        this.notification = null;
        // load notifications
        this.rssService.getNotifications(index).subscribe(feed => {

            // remove all break lines
            feed = feed.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ');
            // create dom parsers
            const parser = new DOMParser();
            const xml = parser.parseFromString(feed, 'text/xml');
            // convert dom to json
            const obj = this.ngxXml2jsonService.xmlToJson(xml);

            // check type of feed rss/atom
            if (obj['feed']) {
                // parse atom format
                this.feed = <RSSFeed>this.rssService.parseAtom(xml);
            } else {
                this.feed = <RSSFeed>obj['rss'].channel;
            }

            this.inProgress = false;
            // detect viewed  notifications
            from<RSSEntry>(this.feed.item).pipe(
                // filter message by read/unread
                filter(item => {
                    if (this.showOnlyUnreadNotifications) {
                        return !this.storage.get(item.guid);
                    } else {
                        item['view'] = this.storage.get(item.guid);
                        return true;
                    }
                }),
                toArray()
            ).subscribe(res => {
                this.feed.items = res;

            });

        });

    }

    /**
     * get single notification from feed by index
     * @param index
     */
    showNotification(index) {

        this.notification = this.feed.items[index];
        // put notification id into local storage
        this.storage.set(this.notification.guid, '1');
        // create map for store chart data
        let chartData = new Map();
        // if no description
        if (!this.notification.description) {
            return;
        }
        // walk thought every symbol
        // filter and modify
        from(this.notification.description).pipe(
            // filter letters
            filter((x: string) => /^[a-zа-яіїё]+$/i.test(x)),
            // transform to lower case
            map((x: string) => x.toLowerCase()),
            // count each letter
            map(x => chartData.set(x, (chartData.get(x) || 0) + 1)),
            toArray()
        ).toPromise().then(x => {
            // convert map to array and sort
            let data = Array.from(chartData).sort((a, b) => {
                return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;
            });
            // convert array back to map
            chartData = new Map(data);
            // set chart data
            this.doughnutChartLabels = Array.from(chartData.keys());
            this.doughnutChartData = Array.from(chartData.values());
        }).catch(error => {
            this.doughnutChartLabels = [];
            this.doughnutChartData = [];
        });
    }

    /**
     * Set either we want see all notifications or only unread
     * @param status
     */
    showUnreadNotifications(status) {
        // set current choice
        this.showOnlyUnreadNotifications = status;
        // load notifications
        this.loadNotifications(this.indexOfFeed);
        // save choice
        this.storage.set('only-unread', status);
    }
}

