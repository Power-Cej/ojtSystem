class PaymentPresenter {
    constructor(view, makePaypalUseCase, acceptPaypalUseCase, makePurchaseUseCase) {
        this.view = view;
        this.makePaypalUseCase = makePaypalUseCase;
        this.acceptPaypalUseCase = acceptPaypalUseCase;
        this.makePurchaseUseCase = makePurchaseUseCase;
    }

    componentDidMount() {
        this.checkParams();
    }

    checkParams() {
        const purchase = this.view.getParams();
        if (purchase === undefined) {
            this.view.navigateTo('/');
            return;
        }
        if (purchase.total < 1) {
            this.view.showProgressDialog();
            this.makePurchaseUseCase.execute(purchase)
                .then((transaction) => {
                    this.view.hideProgressDialog();
                    this.view.setSubscription(transaction.subscription);
                    this.view.navigateTo('/payment/success');
                })
                .catch(error => {
                    this.view.hideProgressDialog();
                    this.view.showError(error);
                });
        }
    }

    paypalMake() {
        const purchase = this.view.getParams();
        return this.makePaypalUseCase.execute(purchase)
            .then(order => {
                this.order = order;
                return order.id;
            })
            .catch(error => {
                this.view.showError(error);
            });
    }

    paypalApprove() {
        this.view.showProgressDialog();
        const purchase = this.view.getParams();
        purchase.id = this.order.id;
        this.acceptPaypalUseCase.execute(purchase)
            .then((transaction) => {
                this.view.hideProgressDialog();
                this.view.setSubscription(transaction.subscription);
                this.view.navigateTo('/payment/success');
            })
            .catch(error => {
                this.view.hideProgressDialog();
                this.view.showError(error);
            });
    }


}

export default PaymentPresenter;
