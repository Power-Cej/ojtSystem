const ENDPOINT = '/classes/'

class ObjectNetwork {
    constructor(rest) {
        this.rest = rest;
    }

    saveObject(className, object) {
        return this.rest.request('POST', ENDPOINT + className, object);
    }

    getObject(className, id) {
        return this.rest.request('GET', ENDPOINT + className + '/' + id);
    }

    findObject(className, query, session) {
        return this.rest.request('GET', ENDPOINT + className, query, undefined, session);
    }

    deleteObject(className, id) {
        return this.rest.request('DELETE', ENDPOINT + className + '/' + id);
    }

    updateObject(className, object, query, session) {
        return this.rest.request('PUT', ENDPOINT + className, object, query, session);
    }
}

export default ObjectNetwork;
