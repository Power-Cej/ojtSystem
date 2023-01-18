import RestAdapter from '../adapters/rest/RestAdapter';

describe('RestAdapter', () => {
    let restAdapter;
    const open = jest.fn();
    const setRequestHeader = jest.fn();
    let xhr = function () {
        this.open = open;
        this.setRequestHeader = setRequestHeader;
        this.send = jest.fn(body => {
            expect(body).toEqual({name: 'john'});
            this.onload();
        });
        this.response = '{"message": "success"}';
        this.status = 200;
    }
    beforeEach(() => {
        restAdapter = new RestAdapter(xhr);
    });
    it('should post json', function (done) {
        const options = {
            method: 'GET',
            body: {name: 'john'},
            headers: {'Content-Type': 'application/json'}
        };
        const url = new URL('https://api.innque.com/v1');
        restAdapter.request(url, options)
            .then((response) => {
                expect(response).toEqual({"message": "success"});
                expect(open).toHaveBeenCalledWith(options.method, url);
                expect(setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
                done();
            })
            .catch(done.fail);
    });
});
