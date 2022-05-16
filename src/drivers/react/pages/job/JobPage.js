import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import Animate from "../../components/Animate";
import jobAnimation from "../../lotties/job-interview.json";
import Personal from "./Personal";
import Education from "./Education";
import Prepared from "./Prepared";
import {Link} from "react-router-dom";
import ProgressNavigation from "./ProgressNavigation";

class JobPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {object: {}, 'state': 'personal'};
    }

    render() {
        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="vh-100 d-flex align-items-center bg-white m-3 shadow">
                    <div className="container text-center">
                        <Animate
                            width="50%"
                            animationData={jobAnimation}/>
                        <h2 className="mt-3 fw-bold">Looking for a job?</h2>
                        <p>
                            We are happy to help you, just complete your profile to us.
                        </p>
                        <Link className="btn btn-primary" to="/job/form">PROCEED</Link>
                    </div>
                </div>
            </>
        )
    }
}

export default JobPage;
