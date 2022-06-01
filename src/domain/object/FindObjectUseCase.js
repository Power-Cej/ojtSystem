class FindObjectUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(className, query, session) {
        return this.repository.findObject(className, query, session);
    }
}

export default FindObjectUseCase;
