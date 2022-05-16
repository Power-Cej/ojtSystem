class DeleteObjectUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(className, id) {
        return this.repository.deleteObject(className, id);
    }
}

export default DeleteObjectUseCase;
