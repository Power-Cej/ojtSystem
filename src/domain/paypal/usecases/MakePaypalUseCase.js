class MakePaypalUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(transaction) {
        return this.repository.make(transaction);
    }
}

export default MakePaypalUseCase;
