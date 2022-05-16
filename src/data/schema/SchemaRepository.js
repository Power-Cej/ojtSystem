class SchemaRepository {
    constructor(memory, storage, network) {
        this.memory = memory;
        this.storage = storage;
        this.network = network;
    }

    getAllSchemas() {
        const source = [this.memory, this.storage, this.network];
        return source
            .reduce((acc, cur) => {
                return acc
                    .then(schemas => {
                        if (schemas.length > 0) return schemas;
                        return cur.getAllSchemas();
                    })
            }, Promise.resolve([]))
            .then(schemas => {
                this.memory.set(schemas);
                this.storage.set(schemas);
                return schemas;
            });
    }

    addSchema(schema) {
        return this.network.addSchema(schema)
            .then((result) => {
                schema = result;
                return this.getAllSchemas();
            })
            .then(() => schema);
    }

    getSchema(name) {
        return Promise.resolve()
            .then(() => this.memory.getSchema(name))
            .then(schema => {
                if (schema) return schema;
                return this.storage.getSchema(name);
            })
            .then(schema => {
                if (schema) return schema;
                return this.network.getSchema(name)
                    .then(result => {
                        schema = result;
                        return this.getAllSchemas();//re storage
                    })
                    .then(() => schema);
            });
    }

    updateSchema(name, schema) {
        return this.network.updateSchema(name, schema)
            .then(() => this.getAllSchemas())
            .then(() => Promise.resolve());
    }

    deleteSchema(name) {
        return this.network.deleteSchema(name)
            .then(() => this.getAllSchemas())
            .then(() => Promise.resolve());
    }
}

export default SchemaRepository;
