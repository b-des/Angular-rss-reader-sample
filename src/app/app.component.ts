import {Component, Inject, OnInit} from '@angular/core';
import {RssService} from './core/services/rss.service';


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

