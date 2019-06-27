import {Injectable} from '@angular/core';
import {FEEDS} from './mock-feeds';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class RssService {

    // service through which we can load xml without CORS headers
    private parseContent = 'http://crpgenius.000webhostapp.com/api.php?site=';

    constructor(private http: HttpClient) {}

    /**
     * Load feed list
     */
    getFeeds() {
        return Promise.resolve(FEEDS);
    }

    /**
     * Parse atom xml format
     * @param xml
     */
    parseAtom(xml: any) {

        let result = {item: []};
        let atomToRssMap = new Map([
            ['content', 'description'],
            ['id', 'guid'],
            ['updated', 'pubDate'],
            ['subtitle', 'description'],
        ]);
        for (let node of xml.documentElement.childNodes) {

            if (!node.childNodes.length) {
                continue;
            }

            if (node.nodeName !== 'entry') {
                result[atomToRssMap.has(node.nodeName) ? atomToRssMap.get(node.nodeName) : node.nodeName] = node.textContent;
            } else {
                let tmp = {};
                for (let child of node.childNodes) {
                    if (!child.childNodes.length && child.nodeName !== 'link') {
                        continue;
                    } else if (child.nodeName === 'link') {
                        tmp['link'] = child.attributes.href.nodeValue;
                        continue;
                    }
                    tmp[atomToRssMap.has(child.nodeName) ? atomToRssMap.get(child.nodeName) : child.nodeName] = child.textContent;
                }
                result.item.push(tmp);
            }
        }

        return result;
    }


    /**
     * Load notifications of selected feed
     * @param index
     */
    getNotifications(index: number) {
        return this.http.get(this.parseContent + FEEDS[index].url, {responseType: 'text'});
    }
}
