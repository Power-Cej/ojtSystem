class MakePurchaseUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(purchase) {
        return this.repository.make(purchase);
    }
}

export default MakePurchaseUseCase;
