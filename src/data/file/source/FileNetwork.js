const ENDPOINT = '/files/';

class FileNetwork {
    constructor(rest) {
        this.rest = rest;
    }

    saveFile(file) {
        return this.rest.upload(ENDPOINT + file.name, file);
    }
}

export default FileNetwork;
