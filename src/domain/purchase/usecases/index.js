import getPurchaseRepository from '../../../data/purchase';
import MakePurchaseUseCase from './MakePurchaseUseCase';

const repository = getPurchaseRepository();

export function makePurchaseUseCase() {
    return new MakePurchaseUseCase(repository);
}




