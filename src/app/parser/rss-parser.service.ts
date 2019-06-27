/// <reference path="./rss-parser.d.ts" />

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class RSSParserService {
    constructor(private http: HttpClient) {}

    getNotifications(url: string): Observable<any> {
        return this.http.get(url);
    }
}
