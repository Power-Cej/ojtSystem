const KEY = 'SCHEMA_CACHE';
class SchemaCache {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getAllSchemas() {
        return this.adapter.get(KEY).then(results => results ? results : []);
    }

    set(schemas) {
        return this.adapter.put(KEY, schemas);
    }
}

export default SchemaCache;
