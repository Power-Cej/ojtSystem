class SignUpUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(user) {
        return this.repository.signUp(user);
    }
}

export default SignUpUseCase;
