import Queue from 'nq';

class UpdateSchemaUseCase {

    execute(schema) {
        return Queue.Collection.update(schema);
    }
}

export default UpdateSchemaUseCase;
