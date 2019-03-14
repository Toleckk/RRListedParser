import "core-js/modules/es7.symbol.async-iterator";
import WrongLinkException from "./WrongLinkException";

class ListedParser {
    constructor(link, delay = 0) {
        if (!link.match(/listed/))
            throw new WrongLinkException();

        this.link = link.replace(/http(s?):\/\/rivalregions\.com\/#/, '');
        this.delay = delay;
    }

    async parseAll() {
        for(let page = 0, result = []; ; ++page)
            try {
                for (const profile of await this.parsePage(page))
                    result.push(profile);
            } catch {
                return result;
            }
    };

    async* generateAll() {
        try {
            for (let page = 0; ; ++page)
                for (const id of await this.parsePage(page)) {
                    await delay(this.delay);
                    yield id;
                }
        } catch {/*STUB: generating finished*/
        }
    };

    async parsePage(page) {
        const response = await $.get(this.makeLink(page));
        return ListedParser.table(response)
            .match(/<tr.*?>.*?<\/tr>/sg)
            .map(this.parseRow);
    }

    parseRow(row) {
        try {
            return row.match(/<td action=".*?(\d+)"/)[1];
        } catch {
            return null;
        }
    }

    makeLink(page) {
        if (this.link.match("residency") || this.link.match(/\/region\//))
            return this.link + (page ? `/0/${page * 25}` : `?c=${c_html}`);
        return this.link + (page ? `/${page * 25}` : `?c=${c_html}`);
    };

    static table(html) {
        const match = html.match(/<tbody id="list_tbody">.*?<\/tbody>/s);
        return match ? match[0] : html;
    }
}

const delay = async ms => await new Promise(resolve => setTimeout(resolve, typeof ms === 'function' ? ms() : ms));

export default ListedParser;