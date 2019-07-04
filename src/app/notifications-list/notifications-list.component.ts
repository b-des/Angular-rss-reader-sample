import {Component, Inject, OnInit} from '@angular/core';
import {NotificationModel, RssFeedModel} from '../core/models';
import {from} from 'rxjs';
import {filter, toArray} from 'rxjs/operators';
import {RssService} from '../core/services/rss.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {HttpClient} from '@angular/common/http';
import {NgxXml2jsonService} from 'ngx-xml2json';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
@Component({
    selector: 'app-notifications-list',
    templateUrl: './notifications-list.component.html',
    styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {
    // contain feed informations
    feed: RssFeedModel;
    indexOfFeed = 0;
    // does is loading now?
    inProgress = false;
    // should show only unread notifications?
    showOnlyUnreadNotifications = true;

    constructor(private rssService: RssService,
                @Inject(LOCAL_STORAGE) private storage: WebStorageService,
                private http: HttpClient,
                private ngxXml2jsonService: NgxXml2jsonService,
                private router: Router,
                private location: Location,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        // load notifications
        this.activatedRoute.paramMap.subscribe(params => {
            this.loadNotifications(params.get('id'));
        });
        // get stored state of view mode
        this.showOnlyUnreadNotifications = this.storage.get('only-unread');
    }

    /**
     * Set either we want see all notifications or only unread
     * @param status
     */
    showUnreadNotifications(status) {
        // set current choice
        this.showOnlyUnreadNotifications = status;
        // save choice
        this.storage.set('only-unread', status);
        // load notifications
        this.filterItems(this.feed.entries);
    }

    /**
     * redirect user to selected notification
     * @param index
     */
    goToNotififcation(index: number) {
        this.router.navigate(['/notification'], {state: {data: this.feed.items[index]}});
    }

    /**
     * Get notifications from given feed link
     * @param index
     */
   private loadNotifications(index) {
        this.indexOfFeed = index;
        this.inProgress = true;
        // load notifications
        this.rssService.getNotifications(index).subscribe(feed => {
            this.feed = feed;
            // store all notifications
            this.feed['entries'] = this.feed.items;
            this.inProgress = false;
            // filter viewed  notifications
            this.filterItems(this.feed.items);
        });

    }

    private filterItems(items) {
        from<NotificationModel>(items).pipe(
            // filter message by read/unread
            filter(item => {
                if (this.showOnlyUnreadNotifications) {
                    return !this.storage.get(item.guid ? item.guid : item.id);
                } else {
                    item['view'] = this.storage.get(item.guid ? item.guid : item.id);
                    return true;
                }
            }),
            toArray()
        ).subscribe(res => {
            this.feed.items = res;
        });
    }

    goBack() {
        this.location.back();
    }
}
