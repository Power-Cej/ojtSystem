//dependency
import getDiskCacheAdapter from '../../adapters/cache/local';
import getRestController from '../../controllers/rest';
//source
import UserCache from './source/UserCache';
import UserNetwork from './source/UserNetwork';
//repository
import UserRepository from './UserRepository';

const diskAdapter = new getDiskCacheAdapter(NaN);
const restController = getRestController();

const cache = new UserCache(diskAdapter);
const network = new UserNetwork(restController);

export default new UserRepository(cache, network);
