import Queue from 'nq';

class GetAllSchemasUseCase {

    execute() {
        return Queue.Collection.find();
    }
}

export default GetAllSchemasUseCase;
