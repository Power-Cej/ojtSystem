import LocalStorageAdapter from '../adapters/cache/local/LocalStorageAdapter';

describe('LocalStorageAdapter', function () {
    const KEY = 'hello';
    const VALUE = 'world';
    let localStorage = window.localStorage;
    function wait(sleep) {
        return new Promise(function (resolve) {
            setTimeout(resolve, sleep);
        });
    }

    it('should expose promises methods', done => {
        const cache = new LocalStorageAdapter(localStorage);
        // Verify all methods return promises.
        Promise.all([cache.put(KEY, VALUE), cache.delete(KEY), cache.get(KEY), cache.clear()]).then(() => {
            done();
        });
    });
    it('should get/set/clear', done => {
        const cache = new LocalStorageAdapter(localStorage);
        cache
            .put(KEY, VALUE)
            .then(() => cache.get(KEY))
            .then(value => expect(value).toEqual(VALUE))
            .then(() => cache.clear())
            .then(() => cache.get(KEY))
            .then(value => expect(value).toEqual(null))
            .then(done);
    });
    it('should expire after ttl', done => {
        const cache = new LocalStorageAdapter(localStorage,10);
        cache
            .put(KEY, VALUE)
            .then(() => cache.get(KEY))
            .then(value => expect(value).toEqual(VALUE))
            .then(wait.bind(this, 20))
            .then(() => cache.get(KEY))
            .then(value => expect(value).toEqual(null))
            .then(done);
    });
});
