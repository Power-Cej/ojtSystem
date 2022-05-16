import repository from '../../../data/object';
import SaveObjectUseCase from './SaveObjectUseCase';
import FindObjectUseCase from './FindObjectUseCase';
import UpdateObjectUseCase from './UpdateObjectUseCase';
import DeleteObjectUseCase from "./DeleteObjectUseCase";


export  function saveObjectUseCase() {
    return new SaveObjectUseCase(repository);
}

export function findObjectUseCase() {
    return new FindObjectUseCase(repository);
}

export function updateObjectUseCase() {
    return new UpdateObjectUseCase(repository);
}
export function deleteObjectUseCase() {
    return new DeleteObjectUseCase(repository);
}
