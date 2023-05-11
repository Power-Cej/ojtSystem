import SaveObjectUseCase from './SaveObjectUseCase';
import FindObjectUseCase from './FindObjectUseCase';
import UpdateObjectUseCase from './UpdateObjectUseCase';
import DeleteObjectUseCase from "./DeleteObjectUseCase";
import UpsertUseCase from "./UpsertUseCase";


export  function saveObjectUseCase() {
    return new SaveObjectUseCase();
}

export function findObjectUseCase() {
    return new FindObjectUseCase();
}

export function updateObjectUseCase() {
    return new UpdateObjectUseCase();
}
export function deleteObjectUseCase() {
    return new DeleteObjectUseCase();
}
export function upsertUseCase() {
    return new UpsertUseCase();
}
