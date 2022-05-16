class ObjectRepository {
    constructor(network) {
        this.network = network;
    }

    saveObject(className, object) {
        return this.network.saveObject(className, object);
    }

    getObject(className, id) {
        return this.network.getObject(className, id);
    }

    findObject(className, query,session) {
        return this.network.findObject(className, query,session);
    }

    updateObject(className, object, query, session) {
        return this.network.updateObject(className, object, query, session);
    }

    deleteObject(className, id) {
        return this.network.deleteObject(className, id);
    }
}

export default ObjectRepository;
