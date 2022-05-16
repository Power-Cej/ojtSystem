//dependency
import getRestController from '../../controllers/rest';
//repository
import EmailRepository from './EmailRepository';

const restController = getRestController();

function getEmailRepository() {
    return new EmailRepository(restController);
}

export default getEmailRepository;
