class UpdateSchemaUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(schema) {
        return this.repository.updateSchema(schema.name, schema);
    }
}

export default UpdateSchemaUseCase;
