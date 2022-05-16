class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance(other) {
        return this.getDistance(other.x, other.y, this.x, this.y);
    }

    getDistance(x1, y1, x2, y2) {
        const xDistance = x1 - x2;
        const yDistance = y1 - y2;
        const a = Math.pow(xDistance, 2);
        const b = Math.pow(yDistance, 2);
        const c = Math.sqrt(a + b);
        return c;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    mul(other) {
        this.x *= other;
        this.y *= other;
        return this;
    }
}

export default Vector;
