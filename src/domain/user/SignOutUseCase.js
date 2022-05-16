class SignOutUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute() {
        return this.repository.signOut();
    }
}

export default SignOutUseCase;
