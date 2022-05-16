import FileNetwork from '../data/file/source/FileNetwork';

describe('FileNetwork', function () {
    const ENDPOINT = '/files/';
    let network;
    let rest;
    beforeEach(() => {
        rest = {
            upload: jest.fn(() => Promise.resolve())
        }
        network = new FileNetwork(rest);
    });
    it('should save file', function (done) {
        const file = {name: 'text.txt', type: 'image/png'};
        network.saveFile(file)
            .then(() => {
                expect(rest.upload).toHaveBeenCalledWith(ENDPOINT + file.name, file);
                done();
            })
            .catch(done.fail);
    });
});
