import RestController from './RestController';
import getRestAdapter from '../../adapters/rest';
import getDiskCacheAdapter from '../../adapters/cache/local';
import UserCache from '../../data/user/source/UserCache';
import Config from '../../Config';

const diskAdapter = new getDiskCacheAdapter(NaN);
const userCache = new UserCache(diskAdapter);

function getRestController() {
    const restAdapter = getRestAdapter();
    return new RestController(restAdapter, Config, userCache);
}

export default getRestController;
