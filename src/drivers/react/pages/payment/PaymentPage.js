import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import PaymentPresenter from "../../presenters/PaymentPresenter";
import Paypal from "../../components/Paypal";
import {makePaypalUseCase,acceptPaypalUseCase} from "../../domain/paypal/usecases";
import {makePurchaseUseCase} from "../../domain/purchase/usecases";

class PaymentPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new PaymentPresenter(this, makePaypalUseCase(), acceptPaypalUseCase(),makePurchaseUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    payClick(e) {
        e.preventDefault();
        this.presenter.pay();
    }

    createOrder() {
        return this.presenter.paypalMake();
    }

    onApprove() {
        this.presenter.paypalApprove();
    }

    render() {
        return (
            <>
                <NavBar className="shadow-sm mb-3"/>
                <div className="container">
                    <h2 className="mb-3"><strong>Payment Method</strong></h2>
                    <div className="shadow-sm rounded bg-white mb-3">
                        <div className="p-3 px-lg-5 py-lg-4">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-paypal display-4 me-3 text-muted"></i>
                                <div>
                                    <Paypal
                                        createOrder={this.createOrder.bind(this)}
                                        onApprove={this.onApprove.bind(this)}/>
                                </div>
                                <i className="bi bi-chevron-right ms-auto"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default PaymentPage;
