class GetAllSchemasUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute() {
        return this.repository.getAllSchemas();
    }
}

export default GetAllSchemasUseCase;
