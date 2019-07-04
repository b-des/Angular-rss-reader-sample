import {NotificationModel} from './notification.model';

export interface RssFeedModel {
    title: string;
    link: string;
    entries: NotificationModel[];
    items: NotificationModel[];
}
