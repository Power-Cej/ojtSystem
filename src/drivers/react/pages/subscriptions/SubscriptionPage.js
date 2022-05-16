import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import SubscriptionsPresenter from "../../presenters/SubscriptionsPresenter";
import dateDiff from "../../dateDiff";
import {Link, Redirect} from "react-router-dom";
import PlanPage from "../plan/PlanPage";

class SubscriptionPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new SubscriptionsPresenter(this);
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    render() {
        const subscription = this.getSubscription();
        if (subscription === false) return <Redirect to="/plan"/>;
        const plan = subscription.plan;
        const user = this.getCurrentUser();
        const firstName = user.name.split(' ')[0];
        const startDate = new Date(subscription.createdAt);
        const endDate = new Date(subscription.endAt);
        const date = new Date();
        const days = dateDiff(date, endDate).toFixed();
        const startAt = startDate.toLocaleDateString("en-US", {dateStyle: "medium"});
        const endAt = endDate.toLocaleDateString("en-US", {dateStyle: "medium"});
        return (
            <>
                <NavBar className="shadow-sm mb-3"/>
                <div className="container">
                    <>
                        <h2 className="mb-3"><strong>Subscriptions</strong></h2>
                        <p className="m-0"><strong>Hello {firstName},</strong></p>
                        <p>Thank you for being a premium member.</p>
                        <div className="shadow-sm rounded bg-white mb-3">
                            <div className="p-3 px-lg-5 py-lg-4">
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        <i className="bi bi-tag display-1 text-primary"></i>
                                    </div>
                                    <div className="col-10">
                                        <div className="row">
                                            <div className="col">
                                                <span className="m-0 small text-muted fw-bold">ID: </span>
                                                <small>{subscription.id}</small>
                                            </div>
                                            <div className="col">
                                                <span className="m-0 small text-muted fw-bold">Days: </span>
                                                <small>{days}</small>
                                            </div>
                                        </div>
                                        <hr className="dropdown-divider"/>
                                        <div className="row">
                                            <div className="col">
                                                <h6 className="m-0 small text-muted fw-bold">Applied on</h6>
                                                <small>{startAt}</small>
                                            </div>
                                            <div className="col">
                                                <h6 className="m-0 small text-muted fw-bold">Valid untill</h6>
                                                <small>{endAt}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <div className="shadow-sm rounded bg-white h-100">
                                    <div className="border border-primary border-2 w-25 mx-auto"></div>
                                    <div className="p-3 px-lg-5 py-lg-4 d-flex flex-column h-100">
                                        <div className="text-center">
                                            <h4>{plan.name}</h4>
                                        </div>
                                        <ul className="list-unstyled">
                                            <li><i className="bi bi-check me-2"></i>Premium Tutorials</li>
                                        </ul>
                                        <Link
                                            to={"/plan"}
                                            className="btn btn-primary w-75 mt-auto mx-auto mb-1">RENEW</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                </div>
            </>
        )
    }

}

export default SubscriptionPage;
