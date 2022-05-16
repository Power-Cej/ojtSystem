//dependency
import getMemoryCacheAdapter from '../../adapters/cache/memory';
import getDiskCacheAdapter from '../../adapters/cache/local';
import getRestController from '../../controllers/rest';

import SchemaCache from './source/SchemaCache';
import SchemaNetwork from './source/SchemaNetwork';
import SchemaRepository from './SchemaRepository';

const diskAdapter = new getDiskCacheAdapter();

const memoryAdapter = new getMemoryCacheAdapter();

const restController = getRestController();


//source
const memoryCache = new SchemaCache(memoryAdapter);
const diskCache = new SchemaCache(diskAdapter);
const network = new SchemaNetwork(restController);

//repository
export default new SchemaRepository(memoryCache, diskCache, network);
