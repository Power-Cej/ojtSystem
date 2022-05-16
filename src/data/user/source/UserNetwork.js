class UserNetwork {
    constructor(rest) {
        this.rest = rest;
    }

    signIn(user) {
        return this.rest.request('POST', '/signin', user);
    }

    signUp(user) {
        return this.rest.request('POST', '/signup', user);
    }

    signOut() {
        return this.rest.request('POST', '/signout');
    }

    get() {
        return this.rest.request('GET', '/me');
    }

    resetPassword(user) {
        return this.rest.request('POST', '/reset', user);
    }

    update(user) {
        return this.rest.request('PUT', '/classes/users/' + user.id, user);
    }
}

export default UserNetwork;
