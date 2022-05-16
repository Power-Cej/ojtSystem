import RestAdapter from './RestAdapter';

function getRestAdapter() {
    let XHR = null;
    if (XMLHttpRequest) {
        XHR = XMLHttpRequest;
    } else {
        throw new Error('XMLHttpRequest was found.');
    }
    return new RestAdapter(XHR);
}

export default getRestAdapter;
