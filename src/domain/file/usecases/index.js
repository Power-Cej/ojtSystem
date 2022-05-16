import SaveImageUseCase from './SaveImageUseCase';
import SaveFileUseCase from './SaveFileUseCase';
import repository from '../../../data/file';

export function saveFileUseCase() {
    return new SaveFileUseCase(repository);
}

export function saveImageUseCase() {
    return new SaveImageUseCase(repository);
}

