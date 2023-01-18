import LocalStorage from '../adapters/cache/local/LocalStorage';

describe('DiskCache', () => {
    const BASE_TTL = 100;
    const NO_EXPIRE_TTL = NaN;
    const KEY = 'hello';
    const KEY_2 = KEY + '_2';
    const VALUE = 'world';
    let localStorage = window.localStorage;
    let cache;

    function wait(sleep) {
        return new Promise(function (resolve) {
            setTimeout(resolve, sleep);
        });
    }

    beforeEach(() => {
        cache = new LocalStorage(localStorage, BASE_TTL);
    });
    it('should put get and destroy', function (done) {
        cache.put(KEY, VALUE);
        let value = cache.get(KEY);
        expect(value).toEqual(VALUE);
        wait(BASE_TTL + 5).then(() => {
            value = cache.get(KEY);
            expect(value).toEqual(null);
            done();
        });
    });
    it('should delete items', done => {
        const cache = new LocalStorage(localStorage, NO_EXPIRE_TTL);
        cache.put(KEY, VALUE);
        cache.put(KEY_2, VALUE);
        expect(cache.get(KEY)).toEqual(VALUE);
        expect(cache.get(KEY_2)).toEqual(VALUE);
        cache.delete(KEY);
        expect(cache.get(KEY)).toEqual(null);
        expect(cache.get(KEY_2)).toEqual(VALUE);
        cache.delete(KEY_2);
        expect(cache.get(KEY)).toEqual(null);
        expect(cache.get(KEY_2)).toEqual(null);
        done();
    });
    it('should clear all items', done => {
        const cache = new LocalStorage(localStorage, NO_EXPIRE_TTL);
        cache.put(KEY, VALUE);
        cache.put(KEY_2, VALUE);
        expect(cache.get(KEY)).toEqual(VALUE);
        expect(cache.get(KEY_2)).toEqual(VALUE);
        cache.clear();
        expect(cache.get(KEY)).toEqual(null);
        expect(cache.get(KEY_2)).toEqual(null);
        done();
    });
    it('should deafult TTL to 5 seconds', () => {
        const cache = new LocalStorage(localStorage);
        expect(cache.ttl).toEqual(5 * 1000);
    });

});
