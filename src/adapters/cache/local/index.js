import LocalStorageAdapter from './LocalStorageAdapter';

function getCacheAdapter(ttl) {
    return new LocalStorageAdapter(window.localStorage, ttl);
}

export default getCacheAdapter;


