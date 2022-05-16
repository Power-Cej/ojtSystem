import BasePage from "../../base/BasePage";
import Spinner from "../../components/Spinner";
import PlanPage from "../plan/PlanPage";
import SubscriptionPage from "./SubscriptionPage";


class SubscriptionsPage extends BasePage {

    render() {
        const subscription = this.getSubscription();
        const progress = subscription === undefined;
        if (progress) {
            return (
                <div className="d-flex justify-content-center">
                    <Spinner/>
                </div>
            )
        }
        if (subscription === false) {
            return (
                <PlanPage/>
            )
        }
        return (
            <SubscriptionPage/>
        )
    }

}

export default SubscriptionsPage;
