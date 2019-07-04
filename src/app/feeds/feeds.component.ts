import { Component, OnInit } from '@angular/core';
import {RssLinkModel} from '../core/models';
import {RssService} from '../core/services/rss.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
    feeds: RssLinkModel[];
  constructor(private rssService: RssService) { }

  ngOnInit() {
      // load feed list
      this.rssService.getFeeds().then(feeds => this.feeds = feeds);
  }

}
