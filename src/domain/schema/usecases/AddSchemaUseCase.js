class AddSchemaUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(schema) {
        return this.repository.addSchema(schema);
    }
}

export default AddSchemaUseCase;
