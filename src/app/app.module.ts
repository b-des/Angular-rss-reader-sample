import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { UniquePipe } from './core/pipes/unique.pipe';
import { ChartsModule } from 'ng2-charts-x';
import { StorageServiceModule} from 'angular-webstorage-service';
import { SingleNotificationComponent } from './single-notification/single-notification.component';
import {NotificationsListComponent} from './notifications-list/notifications-list.component';
import {FeedsComponent} from './feeds/feeds.component';
import {StatisticComponent} from './shared/statistic/statistic.component';

@NgModule({
    declarations: [
        AppComponent,
        UniquePipe,
        FeedsComponent,
        SingleNotificationComponent,
        NotificationsListComponent,
        StatisticComponent
    ],
    imports: [
        BrowserModule,
        ChartsModule,
        AppRoutingModule,
        HttpClientModule,
        StorageServiceModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
