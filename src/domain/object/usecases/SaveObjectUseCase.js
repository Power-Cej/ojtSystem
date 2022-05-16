class SaveObjectUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(className, object) {
        return this.repository.saveObject(className, object);
    }
}

export default SaveObjectUseCase;
