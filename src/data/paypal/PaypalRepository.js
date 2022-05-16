const ENDPOINT = '/paypal/'

class PaypalRepository {
    constructor(rest) {
        this.rest = rest;
    }

    make(payment) {
        return this.rest.request('POST', ENDPOINT + 'make', payment);
    }

    accept(payment) {
        return this.rest.request('POST', ENDPOINT + 'accept', payment);
    }
}

export default PaypalRepository;
