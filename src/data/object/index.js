import getRestController from '../../controllers/rest';
import ObjectNetwork from './source/ObjectNetwork';
import ObjectRepository from './ObjectRepository';
const restController = getRestController();

const network = new ObjectNetwork(restController);

export default new ObjectRepository(network);
