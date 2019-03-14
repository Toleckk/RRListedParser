import ListedParser from "./ListedParser";

class Builder {
    constructor(link, delay = 0){
        this.parser = new ListedParser(link, delay);
    }

    parsePage(parsePage){
        this.parser.parsePage = parsePage;
        return this;
    }

    parseRow(parseRow){
        this.parser.parseRow = parseRow;
        return this;
    }

    makeLink(makeLink){
        this.parser.makeLink = makeLink;
        return this;
    }

    build(){
        return this.parser;
    }
}

export default Builder;