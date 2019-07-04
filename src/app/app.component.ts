import {Component, Inject, OnInit} from '@angular/core';
import {RssLinkModel} from './core/models/rss-link.model';
import {RssService} from './core/services/rss.service';
import {from} from 'rxjs';
import {filter, map, toArray} from 'rxjs/operators';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {NgxXml2jsonService} from 'ngx-xml2json';
import {NotificationModel, RssFeedModel} from './core/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [RssService]
})

export class AppComponent implements OnInit {


    constructor() {
    }

    ngOnInit(): void {

    }
}

