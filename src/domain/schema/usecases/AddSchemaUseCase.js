import Queue from 'nq';

class AddSchemaUseCase {
    execute(schema) {
        return Queue.Collection.create(schema);
    }
}

export default AddSchemaUseCase;
