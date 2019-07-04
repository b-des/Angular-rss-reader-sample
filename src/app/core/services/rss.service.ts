import {Injectable} from '@angular/core';
import {FEEDS} from '../mock-feeds';
import {HttpClient} from '@angular/common/http';
import { RssFeedModel} from '../models';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable()
export class RssService {

    constructor(private http: HttpClient) {}

    /**
     * Load feed list
     */
    getFeeds() {
        return Promise.resolve(FEEDS);
    }

    /**
     * Load notifications of selected feed
     * @param index
     */
    getNotifications(index: number): Observable<RssFeedModel> {
         return this.http.get<RssFeedModel>(`${environment.api_url}/get-notifications`, {params: {'source': FEEDS[index].url}});
    }
}
