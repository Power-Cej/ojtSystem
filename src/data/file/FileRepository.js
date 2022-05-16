class FileRepository {
    constructor(network) {
        this.network = network;
    }

    saveFile(file) {
        return this.network.saveFile(file);
    }
}

export default FileRepository;
