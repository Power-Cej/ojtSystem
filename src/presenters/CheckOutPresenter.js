class CheckOutPresenter {
    constructor(view, findCoupon) {
        this.view = view;
        this.findCoupon = findCoupon;
    }

    componentDidMount() {

    }

    couponApply(coupon) {
        this.view.setError();
        this.view.showProgress();
        const query = {
            where: {code: coupon.code}
        };
        this.findCoupon.execute('coupons', query)
            .then(([coupon]) => {
                this.view.hideProgress();
                if (coupon === undefined) {
                    this.view.setError('invalid coupon code');
                    return;
                }
                if (coupon.limit < 1) {
                    this.view.setError('coupon already used');
                    return;
                }
                this.view.setCoupons([coupon]);
            })
            .catch(error => {
                this.view.hideProgress();
            });
    }

    removeCouponClick(index) {
        const coupons = this.view.getCoupons();
        coupons.splice(index, 1);
        this.view.setCoupons(coupons);
    }
}

export default CheckOutPresenter;
