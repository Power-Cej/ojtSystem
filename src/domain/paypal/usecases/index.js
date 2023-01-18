import getPaypalRepository from '../../../data/paypal';
import MakePaypalUseCase from './MakePaypalUseCase';
import AcceptPaypalUseCase from './AcceptPaypalUseCase';

const repository = getPaypalRepository();

export function makePaypalUseCase() {
    return new MakePaypalUseCase(repository);
}
export function acceptPaypalUseCase() {
    return new AcceptPaypalUseCase(repository);
}



