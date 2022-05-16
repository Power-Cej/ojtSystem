import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import PlanPresenter from "../../presenters/PlanPresenter";
import {findObjectUseCase} from "../../domain/object/usecases";
import {Link} from "react-router-dom";

class PlanPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new PlanPresenter(this, findObjectUseCase(), findObjectUseCase());
        this.state = {
            discounts: [],
            plans: [],
            discount: {
                quantity: 1,
                rate: 1,
            },
        };
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    setDiscounts(discounts) {
        this.setState({discounts});
    }

    setPlans(plans) {
        this.setState({plans});
    }

    setDiscount(discount) {
        this.setState({discount});
    }

    setPlan(plan) {
        this.setState({plan});
    }

    discountChange(discount) {
        this.presenter.selectDiscount(discount);
    }

    render() {
        const subscription = this.getSubscription();
        const {discounts, plans, discount} = this.state;
        return (
            <>
                <NavBar className="shadow-sm mb-3"/>
                <div className="container">
                    <h2 className="mb-3"><strong>Flexible Plans</strong></h2>
                    <p>
                        Purchase a subscription plan to help us maintain and improve our app, thank you for supporting
                        us.</p>
                    <div className="shadow-sm rounded bg-white mb-3">
                        <div className="p-3 px-lg-5 py-lg-4">
                            <div className="row">
                                {
                                    discounts.map(d => {
                                        const {id, name, rate} = d;
                                        return (
                                            <div key={id} className="col-6 col-md-3">
                                                <div className="form-check">
                                                    <input
                                                        onChange={this.discountChange.bind(this, d)}
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="radio-month"
                                                        id={id}
                                                        checked={discount.id === id}/>
                                                    <label className="form-check-label text-nowrap" htmlFor={id}>
                                                        {name}{rate > 1 && <small className="ms-1">(-{rate})%</small>}
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="shadow-sm rounded bg-white h-100">
                                <div className="border border-primary border-2 w-25 mx-auto"></div>
                                <div className="p-3 px-lg-5 py-lg-4 d-flex flex-column h-100">
                                    <div className="text-center">
                                        <h4>Free</h4>
                                        <h1><strong>₱0</strong></h1>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li><i className="bi bi-check me-2"></i>Tutorials</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {
                            plans.map(plan => {
                                const {name, price} = plan;
                                const quantity = discount.quantity;
                                const subtotal = price * quantity;
                                const less = subtotal * (discount.rate / 100);
                                const total = subtotal - less;
                                return (
                                    <div className="col-md-4 mb-3">
                                        <div className="shadow-sm rounded bg-white h-100">
                                            <div className="border border-primary border-2 w-25 mx-auto"></div>
                                            <div className="p-3 px-lg-5 py-lg-4 d-flex flex-column h-100">
                                                <div className="text-center">
                                                    <h4>{name}</h4>
                                                    <h1><strong>₱{total.toFixed()}</strong></h1>
                                                </div>
                                                <ul className="list-unstyled">
                                                    <li><i className="bi bi-check me-2"></i>Premium Tutorials</li>
                                                </ul>
                                                <Link
                                                    to={{
                                                        pathname: "/checkout",
                                                        state: {
                                                            discount,
                                                            plan,
                                                            subscription: subscription ? subscription : undefined
                                                        }
                                                    }}
                                                    className="btn btn-primary w-75 mt-auto mx-auto mb-1">
                                                    {subscription ? 'RENEW' : 'CHOOSE'}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default PlanPage;
