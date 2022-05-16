export function pointInRectangle(rect, vector) {
    return pointInRectangleXY(rect, vector.x, vector.y);
}

export function pointInRectangleXY(rect, x, y) {
    return rect.pos.x <= x && rect.pos.x + rect.width >= x &&
        rect.pos.y <= y && rect.pos.y + rect.height >= y;
}


export function overlapRectangles(r1, r2) {
    return r1.pos.x < r2.pos.x + r2.width &&
        r1.pos.x + r1.width > r2.pos.x &&
        r1.pos.y < r2.pos.y + r2.height &&
        r1.pos.y + r1.height > r2.pos.y;
}



