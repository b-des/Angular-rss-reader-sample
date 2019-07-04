import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleNotificationComponent} from './single-notification/single-notification.component';
import {NotificationsListComponent} from './notifications-list/notifications-list.component';
import {FeedsComponent} from './feeds/feeds.component';


const routes: Routes = [
    { path: '', component: FeedsComponent, pathMatch: 'full'},
    { path: 'notifications/:id', component: NotificationsListComponent, pathMatch: 'full'},
    { path: 'notification', component: SingleNotificationComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
