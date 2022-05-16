import getRestController from '../../controllers/rest';
import FileNetwork from './source/FileNetwork';
import FileRepository from './FileRepository';
const restController = getRestController();

const network = new FileNetwork(restController);


export default new FileRepository(network);
