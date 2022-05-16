const ENDPOINT = '/schemas/'

class SchemaNetwork {
    constructor(rest) {
        this.rest = rest;
    }

    getAllSchemas() {
        return this.rest.request('GET', ENDPOINT);
    }

    addSchema(schema) {
        return this.rest.request('POST', ENDPOINT, schema);
    }

    getSchema(className) {
        return this.rest.request('GET', ENDPOINT + className);
    }

    updateSchema(className, schema) {
        return this.rest.request('PUT', ENDPOINT + className, schema);
    }

    deleteSchema(className) {
        return this.rest.request('DELETE', ENDPOINT + className);
    }
}

export default SchemaNetwork;
