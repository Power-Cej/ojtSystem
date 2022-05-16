import BasePage from "../../base/BasePage";
import React from "react";
import Animate from "../../components/Animate";
import InputVerification from "../../components/InputVerification";
import Button from "../../components/Button";
import botAnimation from '../../lotties/bot-butler.json';
import lockAnimation from '../../lotties/turn-lock.json';
import InputString from "../../components/InputFactory/type/InputString";
import {Link} from "react-router-dom";
import ForgotPresenter from "../../presenters/ForgotPresenter";
import {resetPasswordUseCase} from "../../domain/user";

class ForgotPasswordPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new ForgotPresenter(this, resetPasswordUseCase());
        this.state = {user: {}, progress: false};
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    onSubmit(e) {
        e.preventDefault();
        this.presenter.submit(this.state.user);
    }

    render() {
        const parent = {
            position: 'relative',
            width: '60%',
            height: 0,
            paddingBottom: '60%',
        }
        const {progress} = this.state;
        return (
            <div className="vh-100">
                <div className="container d-flex h-100">
                    <div className="bg-white shadow rounded m-auto">
                        <div className="p-4 p-lg-5">
                            <h3 className="fw-bold pt-4">Forgot Password?</h3>
                            <p className="text-muted mb-3">Enter your email and we'll send you a link to
                                reset
                                your password.</p>
                            <form className="mb-4" onSubmit={this.onSubmit.bind(this)}>
                                <label className="form-label fs-sm">Email Address</label>
                                <InputString
                                    required
                                    type="email"
                                    autoComplete="nope"
                                    className="form-control mb-3"
                                    placeholder="Email Address"
                                    field="email"
                                    object={this.state.user}/>
                                <div className="text-center">
                                    <Button
                                        progress={progress}
                                        className="w-50">{progress ? 'SENDING...' : 'SEND'}</Button>
                                </div>
                            </form>
                            <div className="text-center">
                                <Link className="btn btn-link link-dark"
                                      to={{
                                          pathname: "/signin",
                                          state: {transition: "slide-right"}
                                      }}><i className="bi bi-arrow-left me-2"></i>Back to sign in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPasswordPage;
