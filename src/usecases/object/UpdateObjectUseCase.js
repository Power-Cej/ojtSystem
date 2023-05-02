import Queue from 'nq';

class UpdateObjectUseCase {
    execute(collection, document, options, session) {
        return new Queue.Document().update(collection, document, session);
    }
}

export default UpdateObjectUseCase;
