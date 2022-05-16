import GetAllSchemasUseCase from './GetAllSchemasUseCase';
import AddSchemaUseCase from './AddSchemaUseCase';
import UpdateSchemaUseCase from './UpdateSchemaUseCase';
import DeleteSchemaUseCase from './DeleteSchemaUseCase';
import repository from '../../../data/schema';
export function getAllSchemasUseCase(){
    return new GetAllSchemasUseCase(repository);
}
export function addSchemaUseCase(){
    return new AddSchemaUseCase(repository);
}
export function updateSchemaUseCase(){
    return new UpdateSchemaUseCase(repository);
}
export function deleteSchemaUseCase(){
    return new DeleteSchemaUseCase(repository);
}
