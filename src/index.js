import Builder from "./Builder";
import ListedParser from "./ListedParser";

const createParser = (link, delay) => new Builder(link, delay);

export {ListedParser, Builder};
export default createParser;