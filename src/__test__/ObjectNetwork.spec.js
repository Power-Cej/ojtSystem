import ObjectNetwork from '../data/object/source/ObjectNetwork';

describe('ObjectNetwork', function () {
    const ENDPOINT = '/classes/'
    let network;
    let rest;
    beforeEach(() => {
        rest = {
            request: jest.fn(() => Promise.resolve())
        }
        network = new ObjectNetwork(rest);
    });
    it('should save object', function (done) {
        const className = 'person';
        const object = {name: 'john'};
        network.saveObject(className, object)
            .then(() => {
                expect(rest.request).toHaveBeenCalledWith('POST', ENDPOINT + className, object);
                done();
            })
            .catch(done.fail);
    });
    it('should find object', function (done) {
        const className = 'person';
        const query = {};
        network.findObject(className, query)
            .then(() => {
                expect(rest.request).toHaveBeenCalledWith('GET', ENDPOINT + className, query);
                done();
            })
            .catch(done.fail);
    });
    it('should get object', function (done) {
        const className = 'person';
        const id = 'john';
        network.getObject(className, id)
            .then(() => {
                expect(rest.request).toHaveBeenCalledWith('GET', ENDPOINT + className + '/' + id);
                done();
            })
            .catch(done.fail);
    });
    it('should delete object', function (done) {
        const className = 'person';
        const id = 'john';
        network.deleteObject(className, id)
            .then(() => {
                expect(rest.request).toHaveBeenCalledWith('DELETE', ENDPOINT + className + '/' + id);
                done();
            })
            .catch(done.fail);
    });
    it('should update object', function (done) {
        const className = 'person';
        const object = {name: 'john'};
        network.updateObject(className, object)
            .then(() => {
                expect(rest.request).toHaveBeenCalledWith('PUT', ENDPOINT + className + '/' + object.id, object);
                done();
            })
            .catch(done.fail);
    });
});
