import RestController from '../controllers/rest/RestController';

describe('RestController', () => {
    let restAdapter;
    let restController;
    let userCache;
    const config = {
        SERVER_URL: 'http://api.innque.com/v1',
        APPLICATION_ID: 'test',
        MASTER_KEY: null,
        SESSION_TOKEN: 'abcdefghi',
    }
    const get = {
        get: function (key) {
            if (config.hasOwnProperty(key)) {
                return config[key];
            }
            throw new Error('Configuration key not found: ' + key);
        }
    };
    const user = {
        sessionToken: 'abc'
    };
    beforeEach(() => {
        restAdapter = {
            request: jest.fn(() => Promise.resolve(JSON.stringify(user)))
        };
        userCache = {
            get: jest.fn(() => Promise.resolve())
        };
        restController = new RestController(restAdapter, get, userCache);
    });
    it('should POST request', function (done) {
        const method = 'POST';
        const path = '/classes';
        const data = {name: 'john'};

        restController.request(method, path, data)
            .then((result) => {
                expect(result).toEqual(JSON.stringify(user));
                const url = config.SERVER_URL + '/classes';
                const headers = {};
                headers['Content-Type'] = 'application/json';
                headers['X-Application-Id'] = config.APPLICATION_ID;
                expect(restAdapter.request).toHaveBeenCalledWith(new URL(url), {
                    method,
                    body: JSON.stringify(data),
                    headers
                });
                expect(userCache.get).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    xit('should GET request', function (done) {
        const method = 'GET';
        const path = '/classes';
        const data = {name: 'john'};

        restController.request(method, path, data)
            .then((result) => {
                // expect(result).toEqual(user);
                const url = new URL(config.SERVER_URL + '/classes');
                for (const p in data) {
                    url.searchParams.set(p, JSON.stringify(data[p]));
                }
                const headers = {};
                headers['Content-Type'] = 'application/json';
                headers['X-Application-Id'] = config.APPLICATION_ID;
                expect(restAdapter.request).toHaveBeenCalledWith(url, {
                    method,
                    headers
                });
                expect(userCache.get).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    it('should request POST multiple', function (done) {
        const method = 'POST';
        const path1 = '/users';
        const data1 = {name: 'john'};
        const path2 = '/addresses';
        const data2 = {city: ',manila'};
        const promises = [];
        promises.push(restController.request(method, path1, data1));
        promises.push(restController.request(method, path2, data2));
        Promise.all(promises)
            .then(() => {
                const url1 = config.SERVER_URL + path1;
                const url2 = config.SERVER_URL + path2;
                const headers = {};
                headers['Content-Type'] = 'application/json';
                headers['X-Application-Id'] = config.APPLICATION_ID;
                expect(restAdapter.request).toHaveBeenCalledWith(new URL(url1), {
                    method,
                    body: JSON.stringify(data1),
                    headers
                });
                expect(restAdapter.request).toHaveBeenCalledWith(new URL(url2), {
                    method,
                    body: JSON.stringify(data2),
                    headers
                });
                expect(userCache.get).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    it('should upload file', function (done) {

        const path = '/files';
        const file = {name: 'text.txt', type: 'image/png'};
        restController.upload(path, file)
            .then(() => {
                const url = config.SERVER_URL + path;
                const headers = {};
                headers['Content-Type'] = file.type;
                headers['X-Application-Id'] = config.APPLICATION_ID;
                expect(restAdapter.request).toHaveBeenCalledWith(new URL(url), {
                    method: 'POST',
                    body: file,
                    headers
                });
                expect(userCache.get).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
});
