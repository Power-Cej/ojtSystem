const ENDPOINT = '/import'

class ImportUseCase {
    constructor(rest) {
        this.rest = rest;
    }

    execute(file) {
        const headers = {
            "Content-Type": "application/octet-stream"
        };
        return this.rest.request('POST', ENDPOINT, {body: file, headers});
    }
}

export default ImportUseCase;
