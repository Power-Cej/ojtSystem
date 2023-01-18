import SchemaRepository from '../data/schema/SchemaRepository';

describe('SchemaRepository', () => {
    const person = {
        name: 'persons'
    }
    const address = {
        name: 'addresses'
    }
    const schemas = [person, address];
    let memory;
    let cache;
    let network;
    let repository;
    beforeEach(() => {
        memory = {
            getAllSchemas: jest.fn(() => Promise.resolve(schemas)),
            set: jest.fn(() => Promise.resolve()),
            addSchema: jest.fn(() => Promise.resolve()),
            getSchema: jest.fn(name => Promise.resolve(schemas.find(s => s.name === name))),
            updateSchema: jest.fn(() => Promise.resolve()),
            deleteSchema: jest.fn(() => Promise.resolve())
        }
        cache = {
            getAllSchemas: jest.fn(() => Promise.resolve(schemas)),
            set: jest.fn(() => Promise.resolve()),
            addSchema: jest.fn(() => Promise.resolve()),
            getSchema: jest.fn(name => Promise.resolve(schemas.find(s => s.name === name))),
            updateSchema: jest.fn(() => Promise.resolve()),
            deleteSchema: jest.fn(() => Promise.resolve())
        }
        network = {
            getAllSchemas: jest.fn(() => Promise.resolve(schemas)),
            set: jest.fn(() => Promise.resolve()),
            addSchema: jest.fn(() => Promise.resolve()),
            getSchema: jest.fn(name => Promise.resolve(schemas.find(s => s.name === name))),
            updateSchema: jest.fn(() => Promise.resolve()),
            deleteSchema: jest.fn(() => Promise.resolve())
        }
        repository = new SchemaRepository(memory, cache, network);
    })
    it('should get all Schemas from memory', function (done) {
        repository.getAllSchemas()
            .then(results => {
                expect(results).toEqual(schemas);
                expect(memory.getAllSchemas).toHaveBeenCalled();
                expect(cache.getAllSchemas).not.toHaveBeenCalled();
                expect(network.getAllSchemas).not.toHaveBeenCalled();
                expect(memory.set).toHaveBeenCalledWith(schemas);
                expect(cache.set).toHaveBeenCalledWith(schemas);
                done();
            })
            .catch(done.fail);
    });
    it('should get all Schemas from cache', function (done) {
        memory.getAllSchemas = jest.fn(() => Promise.resolve([]));
        repository.getAllSchemas()
            .then(results => {
                expect(results).toEqual(schemas);
                expect(memory.getAllSchemas).toHaveBeenCalled();
                expect(cache.getAllSchemas).toHaveBeenCalled();
                expect(network.getAllSchemas).not.toHaveBeenCalled();
                expect(memory.set).toHaveBeenCalledWith(schemas);
                expect(cache.set).toHaveBeenCalledWith(schemas);
                done();
            })
            .catch(done.fail);
    });
    it('should get all Schemas from network', function (done) {
        memory.getAllSchemas = jest.fn(() => Promise.resolve([]));
        cache.getAllSchemas = jest.fn(() => Promise.resolve([]));
        repository.getAllSchemas()
            .then(results => {
                expect(results).toEqual(schemas);
                expect(memory.getAllSchemas).toHaveBeenCalled();
                expect(cache.getAllSchemas).toHaveBeenCalled();
                expect(network.getAllSchemas).toHaveBeenCalled();
                expect(memory.set).toHaveBeenCalledWith(schemas);
                expect(cache.set).toHaveBeenCalledWith(schemas);
                done();
            })
            .catch(done.fail);
    });
    it('should add schema', function (done) {
        const user = {
            name: 'users'
        }
        repository.addSchema(user)
            .then(() => {
                expect(network.addSchema).toHaveBeenCalledWith(user);
                expect(memory.getAllSchemas).toHaveBeenCalled();
                expect(cache.getAllSchemas).not.toHaveBeenCalled();
                expect(network.getAllSchemas).not.toHaveBeenCalled();
                expect(memory.set).toHaveBeenCalledWith(schemas);
                expect(cache.set).toHaveBeenCalledWith(schemas);
                done();
            })
            .catch(done.fail);
    });
    it('should get schema from memory', function (done) {
        repository.getSchema(person.name)
            .then((result) => {
                expect(result).toEqual(person);
                expect(memory.getSchema).toHaveBeenCalledWith(person.name);
                expect(cache.getSchema).not.toHaveBeenCalled();
                expect(network.getSchema).not.toHaveBeenCalled();
                expect(memory.getAllSchemas).not.toHaveBeenCalled();
                expect(cache.getAllSchemas).not.toHaveBeenCalled();
                expect(network.getAllSchemas).not.toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    it('should get schema from cache', function (done) {
        memory.getSchema = jest.fn(() => Promise.resolve());
        repository.getSchema(person.name)
            .then((result) => {
                expect(result).toEqual(person);
                expect(memory.getSchema).toHaveBeenCalledWith(person.name);
                expect(cache.getSchema).toHaveBeenCalledWith(person.name);
                expect(network.getSchema).not.toHaveBeenCalled();
                expect(memory.getAllSchemas).not.toHaveBeenCalled();
                expect(cache.getAllSchemas).not.toHaveBeenCalled();
                expect(network.getAllSchemas).not.toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    it('should get schema from network', function (done) {
        memory.getSchema = jest.fn(() => Promise.resolve());
        cache.getSchema = jest.fn(() => Promise.resolve());
        repository.getSchema(person.name)
            .then((result) => {
                expect(result).toEqual(person);
                expect(memory.getSchema).toHaveBeenCalledWith(person.name);
                expect(cache.getSchema).toHaveBeenCalledWith(person.name);
                expect(network.getSchema).toHaveBeenCalled();
                expect(memory.getAllSchemas).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    it('should update schema', function (done) {
        repository.updateSchema('person', person)
            .then(() => {
                expect(network.updateSchema).toHaveBeenCalledWith('person', person);
                expect(memory.getAllSchemas).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
    it('should delete schema', function (done) {
        repository.deleteSchema('person')
            .then(() => {
                expect(network.deleteSchema).toHaveBeenCalledWith('person');
                expect(memory.getAllSchemas).toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
    });
});
