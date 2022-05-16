class SignInUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(user) {
        return this.repository.signIn(user);
    }
}

export default SignInUseCase;
