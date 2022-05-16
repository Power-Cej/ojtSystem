import BasePage from "../../base/BasePage";
import React from "react";
import Animate from "../../components/Animate";
import InputVerification from "../../components/InputVerification";
import Button from "../../components/Button";
import botAnimation from '../../lotties/bot-butler.json';
import lockAnimation from '../../lotties/turn-lock.json';
import {Redirect} from "react-router-dom";
import VerificationPresenter from "../../presenters/VerificationPresenter";
import {emailVerifyUseCase} from "../../domain/email/usecases";
import {updateObjectUseCase} from "../../domain/object/usecases";
import {signOutUseCase} from "../../domain/user";

class VerificationPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            second: 0,
            code: '',
            progress: false,
        };
        this.timer = 0;
        this.presenter = new VerificationPresenter(this, emailVerifyUseCase(), updateObjectUseCase(), signOutUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    disableResend() {
        if (this.state.second === 0) {
            this.setState({second: 60}, () => {
                this.timer = setInterval(this.countDown.bind(this), 1000);
            });
        }
    }

    countDown() {
        this.setState({second: this.state.second - 1});
        if (this.state.second < 1) {
            clearInterval(this.timer);
        }
    }

    resendClick() {
        this.presenter.resend();
    }

    onChange(code) {
        this.setState({code});
    }

    confirmClick() {
        this.presenter.confirm(this.state.code);
    }

    backClick() {
        this.presenter.back();
    }

    render() {
        const params = this.getParams();
        if (params === undefined) return <Redirect to="/signin"/>;
        const {email} = params;
        const parent = {
            position: 'relative',
            width: '60%',
            height: 0,
            paddingBottom: '60%',
        }
        const {second} = this.state;
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
                                        <h2 className="fw-bold">Confirm Account</h2>
                                        <p className="text-muted">
                                            Please enter the code sent to your email below
                                        </p>
                                        <label className="fw-bold mb-3">{email}</label>
                                        <InputVerification className="mb-3"
                                                           onChange={this.onChange.bind(this)}/>
                                        <div className="d-flex justify-content-between mb-4">
                                            <button
                                                className="btn btn-link btn-sm fw-bold"
                                                onClick={this.resendClick.bind(this)}
                                                disabled={second > 0}>
                                                Resend {second > 0 ? `in ${second}` : 'code'}
                                            </button>
                                            <Button
                                                progress={this.state.progress}
                                                onClick={this.confirmClick.bind(this)}
                                                disabled={this.state.code.length < 6}
                                                className="w-50">
                                                {this.state.progress ? 'Please wait...' : 'CONFIRM'}
                                            </Button>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-link link-dark"
                                                    onClick={this.backClick.bind(this)}>
                                                <i className="bi bi-arrow-left me-2"></i>Back to sign up
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default VerificationPage;
