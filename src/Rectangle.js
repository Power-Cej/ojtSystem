const Vector = require("./Vector");

class Rectangle {
    constructor(x, y, width, height) {
        this.pos = new Vector(x, y);
        this.width = width;
        this.height = height;
    }
}

export default Rectangle;
