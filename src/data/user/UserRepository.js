class UserRepository {
    constructor(cache, network) {
        this.cache = cache;
        this.network = network;
    }

    signIn(user) {
        return this.network.signIn(user)
            .then(user => {
                this.cache.set({token: user.sessionToken});
                return user;
            });
    }
    
    signUp(user) {
        return this.network.signUp(user);
    }

    signOut() {
        return this.network.signOut()
            .then(() => this.cache.clear())
            .catch(() => this.cache.clear());
    }

    resetPassword(user) {
        return this.network.resetPassword(user);
    }

    getCurrentUser() {
        return this.network.get();
    }

}

export default UserRepository;
