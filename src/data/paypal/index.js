//dependency
import getRestController from '../../controllers/rest';
//repository
import PaypalRepository from './PaypalRepository';

const restController = getRestController();

function getPaypalRepository() {
    return new PaypalRepository(restController);
}

export default getPaypalRepository;
