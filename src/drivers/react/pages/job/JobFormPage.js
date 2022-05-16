import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import Personal from "./Personal";
import Education from "./Education";
import Prepared from "./Prepared";
import ProgressNavigation from "./ProgressNavigation";

class JobFormPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {object: {}, step: 3};
    }

    onSubmit() {
        if (this.state === 3) {
            return;
        }
        this.setState({step: this.state.step + 1});
    }

    onBack() {
        if (this.state.step > 1) {
            this.setState({step: this.state.step - 1});
        }
    }

    switch() {
        switch (this.state.step) {
            case 1:
                return (
                    <Personal onSubmit={this.onSubmit.bind(this)}/>
                )
            case 2:
                return (
                    <Education onSubmit={this.onSubmit.bind(this)} onBack={this.onBack.bind(this)}/>
                )

            case 3:
                return (
                    <Prepared onSubmit={this.onSubmit.bind(this)} onBack={this.onBack.bind(this)}/>
                )
            default:
        }
    }

    render() {
        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-4 mt-2">
                            <div>
                                <div className="border text-center bg-light p-5">
                                    <i className="bi bi-image-alt display-1 text-dark"></i>
                                </div>
                                <button className="btn btn-dark btn-sm w-100 mt-auto rounded-0">
                                    <i className="bi bi-camera me-2"></i>UPLOAD PROFILE
                                </button>
                            </div>
                        </div>
                        <div className="col-md-8 col-12 mb-3">
                            <ProgressNavigation current={this.state.step} to={3}/>
                            {
                                this.switch()
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default JobFormPage;
