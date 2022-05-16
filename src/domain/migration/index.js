import getRestController from '../../controllers/rest';
import ExportUseCase from './ExportUseCase';
import ImportUseCase from './ImportUseCase';

const restController = getRestController();

export function exportUseCase() {
    return new ExportUseCase(restController);
}

export function importUseCase() {
    return new ImportUseCase(restController);
}
