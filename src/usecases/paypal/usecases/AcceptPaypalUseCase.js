class AcceptPaypalUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(transaction) {
        return this.repository.accept(transaction);
    }
}

export default AcceptPaypalUseCase;
