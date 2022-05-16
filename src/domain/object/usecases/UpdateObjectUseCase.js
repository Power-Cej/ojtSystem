class UpdateObjectUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(className, object, query, session) {
        if (query === undefined) {
            query = {where: {id: object.id}};
        }
        return this.repository.updateObject(className, object, query,session);
    }
}

export default UpdateObjectUseCase;
