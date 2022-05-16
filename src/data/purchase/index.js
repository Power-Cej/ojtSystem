//dependency
import getRestController from '../../controllers/rest';
//repository
import PurchaseRepository from './PurchaseRepository';

const restController = getRestController();

function getPurchaseRepository() {
    return new PurchaseRepository(restController);
}

export default getPurchaseRepository;
