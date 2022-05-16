import BasePage from "../../base/BasePage";
import Animate from "../../components/Animate";
import InputPassword from "../../components/InputFactory/type/InputPassword";
import Button from "../../components/Button";
import botAnimation from "../../lotties/bot-butler.json";
import lockAnimation from "../../lotties/turn-lock.json";
import ResetPresenter from "../../presenters/ResetPresenter";
import {findObjectUseCase, updateObjectUseCase} from "../../domain/object/usecases";

class ResetPasswordPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {user: {}, progress: false};
        this.presenter = new ResetPresenter(this, findObjectUseCase(), updateObjectUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    formSubmit(e) {
        e.preventDefault();
        this.presenter.submit(this.state.user);
    }

    getToken() {
        return this.props.match.params.token;
    }

    render() {
        const parent = {
            position: 'relative',
            width: '60%',
            height: 0,
            paddingBottom: '60%',
        }
        return (
            <div className="vh-100 vw-100 position-absolute">
                <div className="h-100 d-flex">
                    <div className="container my-auto py-3">
                        <div className="bg-white shadow rounded">
                            <div className="row align-items-center py-4 py-lg-5">
                                <div className="col-md-5 border-end border-1">
                                    <div className="p-5">
                                        <div className="bg-warning rounded-circle m-auto" style={parent}>
                                            <div className="position-absolute w-100">
                                                <Animate
                                                    animationData={botAnimation}/>
                                            </div>
                                            <div className="position-absolute w-100"
                                                 style={{left: '40%', top: '70%'}}>
                                                <Animate
                                                    width="40%"
                                                    animationData={lockAnimation}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mx-auto">
                                    <div className="px-4 px-lg-5">
                                        <h2 className="fw-bold">Reset your password</h2>
                                        <p className="text-muted mb-3">Please choose a new password containing a
                                            minimum of 8 characters.</p>
                                        <form onSubmit={this.formSubmit.bind(this)}>
                                            <div className="row g-3 mb-4">
                                                <div className="col-md-12">
                                                    <label className="form-label fs-sm">New Password</label>
                                                    <InputPassword
                                                        required
                                                        className="form-control"
                                                        placeholder="must have at least 8 characters"
                                                        field="password"
                                                        object={this.state.user}
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="form-label fs-sm">Confirm Password</label>
                                                    <InputPassword
                                                        required
                                                        className="form-control"
                                                        placeholder="re-enter your password"
                                                        field="confirmPassword"
                                                        object={this.state.user}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Button
                                                    progress={this.state.progress}
                                                    type="submit"
                                                    className="btn-primary w-50">
                                                    {this.state.progress ? 'Please wait...' : 'RESET'}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPasswordPage;
