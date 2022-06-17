class GetRolesByUserUseCase {
    constructor(rest) {
        this.rest = rest;
    }

    execute(user) {
        const query = {where: {users: [{id: user.id}]}};
        return this.rest.request('GET', '/classes/roles', {query});
    }
}

export default GetRolesByUserUseCase;
