import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import CheckOutPresenter from "../../presenters/CheckOutPresenter";
import formatCurrency from "../../formatCurrency";
import Spinner from "../../components/Spinner";
import InputString from "../../components/InputFactory/type/InputString";
import {findObjectUseCase} from "../../domain/object/usecases";
import {Redirect} from "react-router-dom";

class CheckoutPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new CheckOutPresenter(this, findObjectUseCase());
        this.state = {
            progress: false,
            coupon: {},
            coupons: [],
            error: undefined
        };
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    couponApply(e) {
        e.preventDefault();
        this.presenter.couponApply(this.state.coupon);
    }

    setError(error) {
        this.setState({error});
    }

    setCoupons(coupons) {
        this.setState({coupons});
    }

    removeCouponClick(index) {
        this.presenter.removeCouponClick(index);
    }

    getCoupons() {
        return this.state.coupons;
    }

    render() {
        const {coupons} = this.state;
        const params = this.getParams();
        if (params === undefined) return <Redirect to="/subscription"/>;
        const {plan, discount, subscription} = params;
        const quantity = discount.quantity;
        const subtotal = plan.price * quantity;
        const discountTotal = subtotal * (discount.rate / 100);
        const couponTotal = coupons.reduce((a, b) => a + b.rate, 0);
        const less = discountTotal + couponTotal;
        const total = subtotal - less;
        return (
            <>
                <NavBar className="shadow-sm mb-3"/>
                <div className="container">
                    <h2 className="mb-3"><strong>Checkout</strong></h2>
                    <div className="shadow-sm rounded bg-white mb-3">
                        <div className="row py-4">
                            <div className="col-md-6 border-end border-1">
                                <div className="px-4 px-lg-5 mb-3">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item px-0">
                                            <div className="row m-0 align-items-center">
                                                <div className="col-2 p-0">
                                                    <i className="bi bi-gem display-4"></i>
                                                </div>
                                                <div className="col-9">
                                                    <h6 className="fw-bold mb-0 text-truncate">{plan.name}</h6>
                                                    <small className="me-3 text-muted text-truncate">
                                                        {plan.days * discount.quantity} days
                                                    </small>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="px-4 px-lg-5">
                                    <h6 className="text-muted">Coupon code</h6>
                                    <form onSubmit={this.couponApply.bind(this)} className="mb-3">
                                        <div className="input-group">
                                            <InputString
                                                disabled={this.state.progress}
                                                field="code"
                                                required
                                                object={this.state.coupon}
                                                placeholder="Enter coupon code here"
                                            />
                                            <button
                                                disabled={this.state.progress}
                                                className="btn btn-link text-muted">
                                                {this.state.progress ? <Spinner size={"sm"}/> : 'APPLY'}
                                            </button>
                                        </div>
                                        {
                                            this.state.error &&
                                            <span className="form-text text-danger">
                                                {this.state.error}
                                            </span>
                                        }
                                    </form>
                                    <ul className="list-unstyled">
                                        {
                                            coupons.map((coupon, index) => {
                                                const {id, code, rate} = coupon;
                                                return (
                                                    <li key={id}>
                                                        <button
                                                            onClick={this.removeCouponClick.bind(this, index)}
                                                            className="btn btn-link float-end">
                                                            <i className="bi bi-x-circle"></i>
                                                        </button>
                                                        <h6 className="mb-0">You save {formatCurrency(rate)}</h6>
                                                        <small className="text-muted">{code} Coupon Applied</small>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <h6 className="text-muted mb-4">Order summary</h6>
                                    <hr/>
                                    <div className="row text-truncate">
                                        <div className="col-6 mb-2">
                                            <span>Subtotal</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <span>{formatCurrency(subtotal)}</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <span>Discount</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <span>{formatCurrency(discountTotal)}</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <span>Coupon</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <span>{formatCurrency(couponTotal)}</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row mb-3">
                                        <div className="col-6 mb-2">
                                            <span>Total</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <h4><strong>{formatCurrency(total)}</strong></h4>
                                        </div>
                                    </div>
                                    <div className="text-center ">
                                        <button
                                            onClick={() => this.navigateTo('/payment', {
                                                plan,
                                                discount,
                                                coupon: coupons[0],
                                                total,
                                                subscription
                                            })}
                                            className="btn btn-primary">CHECKOUT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CheckoutPage;
