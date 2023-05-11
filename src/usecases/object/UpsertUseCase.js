import Queue from 'nq';

class UpsertUseCase {
    execute(collection, object, session) {
        if (object.id) {
            const options = {upsert: true};
            return new Queue.Document().update(collection, object, options, session);
        } else {
            return new Queue.Document().create(collection, object, session);
        }
    }
}

export default UpsertUseCase;
