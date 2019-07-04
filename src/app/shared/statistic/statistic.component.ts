import {Component, Input, OnInit} from '@angular/core';
import {NotificationModel, RssFeedModel, RssLinkModel} from '../../core/models';
import {from} from 'rxjs';
import {filter, map, toArray} from 'rxjs/operators';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.scss'],
})
export class StatisticComponent implements OnInit {
    @Input() feed: RssFeedModel;
    @Input() feeds: RssLinkModel[];
    @Input() notification: NotificationModel;
    doughnutChartLabels = [];
    doughnutChartData = [];

    constructor() {
    }

    ngOnInit(): void {
        if (this.notification) {
            this.getNotificationStatistic();
        }
    }

    // load letters using statistic
    getNotificationStatistic() {
        // create map for store chart data
        let chartData = new Map();
        // if no description
        if (!this.notification.content) {
            return;
        }
        // walk thought every symbol
        // filter and modify
        from(this.notification.content).pipe(
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


}
