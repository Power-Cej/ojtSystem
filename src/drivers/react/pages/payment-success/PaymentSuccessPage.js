import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import PaymentPresenter from "../../presenters/PaymentPresenter";
import Paypal from "../../components/Paypal";
import Animate from "../../components/Animate";
import successkAnimation from "../../lotties/success.json";
import {Link} from "react-router-dom";

class PaymentSuccessPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new PaymentPresenter(this);
    }

    payClick(e) {
        e.preventDefault();
        this.presenter.pay();
    }

    render() {
        return (
            <>
                <NavBar className="shadow-sm mb-3"/>
                    <div className="container my-auto text-center">
                        <div className="p-3 px-lg-5 py-lg-4">
                            <div className="row mb-3">
                                <div className="col-7 col-md-4 mx-auto">
                                    <Animate
                                        loop={false}
                                        animationData={successkAnimation}/>
                                </div>
                            </div>
                            <h2 className="fw-bold">Payment Success</h2>
                            <p>Thank you! Your payment was successful.</p>
                            <div>
                                <button onClick={()=>this.navigateTo('/subscription')} className="btn btn-primary mb-3">VIEW SUBSCRIPTIONS</button>
                            </div>
                            <div>
                                <Link to="/" className="mb-3">Back to Home</Link>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
}

export default PaymentSuccessPage;
