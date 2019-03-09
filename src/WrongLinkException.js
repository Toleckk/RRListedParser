class WrongLinkException extends Error {
    constructor() {
        super("Link has wrong format");
    }
}

export default WrongLinkException;