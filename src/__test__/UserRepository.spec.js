import UserRepository from '../data/user/UserRepository';

describe('UserRepository', function () {
    let cache;
    let network;
    let repo;
    const user = {username: 'john', password: 'pass123$'};

    beforeEach(() => {
        cache = {
            set: jest.fn(() => Promise.resolve()),
            get: jest.fn(() => Promise.resolve(user)),
            clear: jest.fn(() => Promise.resolve())
        }
        network = {
            signIn: jest.fn(() => Promise.resolve(user)),
            signUp: jest.fn(() => Promise.resolve()),
            signOut: jest.fn(() => Promise.resolve()),
            forgotPassword: jest.fn(() => Promise.resolve())
        }
        repo = new UserRepository(cache, network);
    });
    it('should sign in', function (done) {
        repo.signIn(user)
            .then(() => {
                expect(network.signIn).toHaveBeenCalledWith(user);
                expect(cache.set).toHaveBeenCalledWith(user);
                done();
            })
            .catch(done.fail);
    });
    it('should sign up', function (done) {
        repo.signUp(user)
            .then(() => {
                expect(network.signUp).toHaveBeenCalledWith(user);
                done();
            })
            .catch(done.fail);
    });
    it('should sign out', function (done) {
        repo.signOut()
            .then(() => {
                expect(network.signOut).toHaveBeenCalled();
                expect(cache.clear).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    it('should forgot password', function (done) {
        repo.forgotPassword(user)
            .then(() => {
                expect(network.forgotPassword).toHaveBeenCalledWith(user);
                done();
            })
            .catch(done.fail);
    });
    it('should get current user', function (done) {
        repo.getCurrentUser()
            .then((result) => {
                expect(result).toEqual(user);
                expect(cache.get).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
});
