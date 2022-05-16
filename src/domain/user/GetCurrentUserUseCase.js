class GetCurrentUserUseCase {
    constructor(rest) {
        this.rest = rest;
    }
    execute() {
        return this.rest.request('GET', '/me');
    }
}

export default GetCurrentUserUseCase;
