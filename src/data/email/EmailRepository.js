const ENDPOINT = '/email/'

class EmailRepository {
    constructor(rest) {
        this.rest = rest;
    }

    verify() {
        return this.rest.request('POST', ENDPOINT + 'verify', {});
    }
}

export default EmailRepository;
