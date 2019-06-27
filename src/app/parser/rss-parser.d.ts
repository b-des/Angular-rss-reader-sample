declare module 'rss-parser'  {

    export class RSSParsed {
        feed: RSSFeed;
        items: RSSEntry[];
    }

    export class RSSFeed {
        url: string;
        title: string;
        description: string;
        link: string;
        item: RSSEntry[];
        items: RSSEntry[];
    }

    export class RSSEntry {
        title: string;
        link: string;
        pubDate: string;
        author: string;
        content: string;
        description: string;
        contentSnippet: string;
        guid: string;
        category: string[];
        isoDate: string;
    }
}
