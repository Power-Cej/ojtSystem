const ENDPOINT = '/purchase/'

class PurchaseRepository {
    constructor(rest) {
        this.rest = rest;
    }

    make(purchase) {
        return this.rest.request('POST', ENDPOINT + 'make', purchase);
    }

}

export default PurchaseRepository;
