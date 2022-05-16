const ENDPOINT = '/export'

class ExportUseCase {
    constructor(rest) {
        this.rest = rest;
    }

    execute() {
        return this.rest.request('POST', ENDPOINT, {raw: true});
    }
}

export default ExportUseCase;
