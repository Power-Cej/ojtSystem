import React from "react";
import {Link} from "react-router-dom";
import BasePage from "../../base/BasePage";
import SignUpPresenter from "./SignUpPresenter";
import {signUpUseCase} from "../../usecases/user";
import {updateObjectUseCase} from "../../usecases/object";
import {Button} from "nq-component";
import withRouter from "../../withRouter";
import InputFactory from "../../components/InputFactory";

class SignUpPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new SignUpPresenter(this, signUpUseCase(), updateObjectUseCase());
        this.state = {progress: false};
    }

    formSubmit(e) {
        e.preventDefault();
        this.presenter.submit(this.state.user);
    }

    onChange(field, value) {
        this.presenter.onChange(field, value);
    }

    render() {
        return (
            <div className="vh-100">
                <div className="d-flex h-100">
                    <div className="m-auto container p-3 px-lg-5 py-lg-4">
                        <div className="bg-white shadow rounded p-3 px-lg-5 py-lg-4">
                            <div className="row">
                                <div className="col-md-6 border-end border-1">
                                    <div className="h-100 d-flex align-items-center">
                                        <div className="text-center p-3 w-100">
                                            <img
                                                className="img-fluid login-img mb-3 w-50"
                                                src="/logo.svg"
                                                alt="company-logo"
                                            />
                                            <h1 className="fw-bold text-black">NQ DASHBOARD</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 p-3 px-lg-5 py-lg-4">
                                    <h2 className="fw-bold mb-3">Register</h2>
                                    <form onSubmit={this.formSubmit.bind(this)}>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label fs-sm">First Name</label>
                                                <InputFactory
                                                    onChange={this.onChange.bind(this, "firstName")}
                                                    type="String"
                                                    className="form-control"
                                                    placeholder="e.g Juan"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fs-sm">Last Name</label>
                                                <InputFactory
                                                    onChange={this.onChange.bind(this, "lastName")}
                                                    type="String"
                                                    className="form-control"
                                                    placeholder="e.g Cruz"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label fs-sm">Email Address</label>
                                                <InputFactory
                                                    onChange={this.onChange.bind(this, "email")}
                                                    type="Email"
                                                    className="form-control"
                                                    placeholder="e.g. username@domain.com"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fs-sm">Password</label>
                                                <InputFactory
                                                    onChange={this.onChange.bind(this, "password")}
                                                    type="Password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fs-sm">Confirm Password</label>
                                                <InputFactory
                                                    onChange={this.onChange.bind(this, "confirmPassword")}
                                                    type="Password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="signup_cb_terms"
                                                    />
                                                    <label
                                                        className="form-check-label fs-xs"
                                                        htmlFor="signup_cb_terms"
                                                    >
                                                        By submitting this form, you agree to our
                                                        <br/>
                                                        <Link to="/terms" target="_blank">
                                                            Terms and Conditions.
                                                        </Link>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mb-3">
                                            <Button
                                                progress={this.state.progress}
                                                type="submit"
                                                className="btn-primary w-50">
                                                {this.state.progress ? 'Please wait...' : 'SIGNUP'}
                                            </Button>
                                        </div>
                                        <div className="text-center">
                                    <span className="fs-sm">
                                      Already have an account?
                                      <Link to="/signin" className="ms-1">
                                        Sign in
                                      </Link>
                                    </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUpPage);
