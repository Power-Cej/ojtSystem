import React from "react";
import BasePage from "../../base/BasePage";
import {Link} from "react-router-dom";
import InputString from "../../components/InputFactory/type/InputString";
import InputPassword from "../../components/InputFactory/type/InputPassword";
import SignUpPresenter from "../../presenters/SignUpPresenter";
import {signUpUseCase} from "../../domain/user";
import Button from "../../components/Button";
import Animate from "../../components/Animate";
import workAnimation from "../../lotties/programmer-work.json";
import ScrollToTop from "../../ScrollToTop";

class SignUpPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new SignUpPresenter(this, signUpUseCase());
        this.state = {user: {}, progress: false};
    }

    showProgress() {
        this.setState({progress: true});
    }

    hideProgress() {
        this.setState({progress: false});
    }

    formSubmit(e) {
        e.preventDefault();
        this.presenter.submit(this.state.user);
    }

    render() {
        const {user} = this.state;
        return (
            <React.Fragment>
                <ScrollToTop/>
                <div className="vh-100 vw-100 position-absolute">
                    <div className="h-100 d-flex">
                        <div className="container my-auto py-3">
                            <div className="bg-white shadow rounded">
                                <div className="row align-items-center py-4 py-lg-5">
                                    <div className="col-md-6 border-end border-1">
                                        <div className="px-4">
                                            <div className="text-center pt-3">
                                                <img className="img-fluid mb-3" width="230"
                                                     src="/logo-banner.svg" alt="logo"/>
                                                <p className="mb-0">We are more than just a community.<br/>
                                                    Change the nation through your Language.</p>
                                                <Animate
                                                    width="70%"
                                                    animationData={workAnimation}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="px-4 px-lg-5">
                                            <div className="d-flex mb-3">
                                                <h2 className="fw-bold my-auto">Register</h2>
                                                <div className="ms-auto d-flex"><p
                                                    className="fs-xs my-auto fw-bold text-muted">Or join with
                                                    : </p>
                                                    <a className="text-dark fs-3 ms-2" href="# "><span><i
                                                        className="bi bi-github"></i></span></a><a
                                                        className="fs-3 ms-2" href="# "><span><i
                                                        className="bi bi-facebook color-facebook"></i></span></a><a
                                                        className="fs-3 ms-2 text-danger" href="# "><span><i
                                                        className="bi bi-google color-google"></i></span></a></div>
                                            </div>
                                            <form className="mb-4" onSubmit={this.formSubmit.bind(this)}>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-12">
                                                        <label className="form-label fs-sm">Full Name</label>
                                                        <InputString
                                                            required
                                                            className="form-control"
                                                            placeholder="e.g. Juan Dela Cruz"
                                                            field="name"
                                                            object={user}/>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="form-label fs-sm">Email Address</label>
                                                        <InputString
                                                            required
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="e.g. username@domain.com"
                                                            field="email"
                                                            object={user}/>
                                                        <span className="form-text fs-xs">We'll never share your email with anyone else.</span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label fs-sm">Password</label>
                                                        <InputPassword
                                                            required
                                                            className="form-control"
                                                            placeholder="must have at least 8 characters"
                                                            field="password"
                                                            object={user}
                                                            minLength={8}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label fs-sm">Confirm Password</label>
                                                        <InputPassword
                                                            required
                                                            className="form-control"
                                                            placeholder="re-enter your password"
                                                            field="confirmPassword"
                                                            object={user}
                                                            minLength={8}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-check">
                                                            <input
                                                                required
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="signup_cb_terms"/>
                                                            <label className="form-check-label fs-xs"
                                                                   htmlFor="signup_cb_terms">
                                                                By submitting this form, you agree to our<br/>
                                                                <a href="/terms" target="_blank">Terms and
                                                                    Conditions.</a>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <Button
                                                        progress={this.state.progress}
                                                        type="submit" className="btn-primary w-50">
                                                        {this.state.progress ? 'Please wait...' : 'SIGN UP'}
                                                    </Button>
                                                </div>
                                            </form>
                                            <div className="text-center">
                                               <span className="fs-sm">Already have an account?
                                                   <Link className="ms-2" to="/signin">Sign in</Link>
                                               </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUpPage;
