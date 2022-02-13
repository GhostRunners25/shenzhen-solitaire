export default class card {
    constructor(symbol, className) {
        this.symbol = symbol;
        this.className = className;
    }

    values = () => {
        return (this.symbol, this.className);
    }
}