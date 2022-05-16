import InMemoryCacheAdapter from './InMemoryCacheAdapter';

function getMemoryCacheAdapter(ttl) {
    return new InMemoryCacheAdapter(ttl);
}

export default getMemoryCacheAdapter;


