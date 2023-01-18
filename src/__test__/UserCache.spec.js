import UserCache from '../data/user/source/UserCache';

describe('UserCache', function () {
    const KEY = 'USER';
    const user = {username: 'john', password: 'pass123$'};
    let adapter;
    let cache;
    beforeEach(() => {
        adapter = {
            put: jest.fn(() => Promise.resolve()),
            get: jest.fn(() => Promise.resolve(user)),
            delete: jest.fn(() => Promise.resolve())
        }
        cache = new UserCache(adapter);
    })
    it('should set user', function (done) {
        cache.set(user)
            .then(() => {
                expect(adapter.put).toHaveBeenCalledWith(KEY, user);
                done();
            })
            .catch(done.fail);
    });
    it('should get user', function (done) {
        cache.get()
            .then((result) => {
                expect(result).toEqual(user);
                expect(adapter.get).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    it('should clear user', function (done) {
        cache.clear()
            .then(() => {
                expect(adapter.delete).toHaveBeenCalledWith(KEY);
                done();
            })
            .catch(done.fail);
    });
});
