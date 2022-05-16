class SaveFileUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(file) {
        return this.repository.saveFile(file);
    }
}

export default SaveFileUseCase;
