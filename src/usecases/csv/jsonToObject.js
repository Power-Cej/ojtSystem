function jsonToObject(json, fields) {
    const object = {};
    for (const key in fields) {
        const value = json[key];
        if (value) {
            object[key] = value;
        }
    }
    return object;
}

export default jsonToObject;