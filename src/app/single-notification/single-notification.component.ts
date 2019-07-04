import {Component, Inject, OnInit} from '@angular/core';
import {NotificationModel} from '../core/models';
import {from} from 'rxjs';
import {filter, map, toArray} from 'rxjs/operators';
import {Location} from '@angular/common';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {RssService} from '../core/services/rss.service';

@Component({
    selector: 'app-single-notification',
    templateUrl: './single-notification.component.html',
    styleUrls: ['./single-notification.component.scss']
})
export class SingleNotificationComponent implements OnInit {

    notification: NotificationModel;

    constructor(private location: Location,
                @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    }

    ngOnInit() {

        if (history.state.data) {
            this.notification = history.state.data;
        } else {
            this.goBack();
        }
        // normalize categories
        if (this.notification.categories) {
            from(this.notification.categories).pipe(
                map(item => item['_'] ? item['_'] : item),
                toArray()
            ).subscribe(categories => {
                this.notification.categories = categories;
            });
        }

        // check if have guid field
        if (!this.notification.guid) {
            this.notification.guid = this.notification.id;
        }
        // save notification as viewed
        this.storage.set(this.notification.guid, '1');
    }

    // back on history
    goBack() {
        this.location.back();
    }

}
