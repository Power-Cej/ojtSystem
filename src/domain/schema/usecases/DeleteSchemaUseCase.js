import Queue from 'nq';

class DeleteSchemaUseCase {
    execute(name) {
        return Queue.Collection.delete(name);
    }
}

export default DeleteSchemaUseCase;
