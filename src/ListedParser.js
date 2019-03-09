import WrongLinkException from "./WrongLinkException";

class ListedParser {
    constructor(link, delay = 0) {
        if (!link.match(/listed/))
            throw new WrongLinkException();

        this.link = link.replace(/http(s?):\/\/rivalregions\.com\/#/, '');
        this.delay = delay;
    }

    async parseAll() {
        const result = [];
        for await (const id of this.generateAll())
            result.push(id);
        return result;
    };

    async* generateAll() {
        try {
            for (let page = 0; ; ++page)
                for (const id of await this.parse(page)) {
                    await delay(this.delay);
                    yield id;
                }
        } catch {/*STUB: generating finished*/}
    };

    parse = async page => ListedParser.table(await $.get(this.makeLink(page)))
        .match(/<tr.*?>.*?<\/tr>/sg)
        .map(row => row.match(/<td action=".*?(\d+)"/)[1]);

    makeLink(page) {
        if (this.link.match("residency"))
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