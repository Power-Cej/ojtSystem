class DeleteSchemaUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(className) {
        return this.repository.deleteSchema(className);
    }
}

export default DeleteSchemaUseCase;
