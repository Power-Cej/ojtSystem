import BasePage from "../../base/BasePage";
import React from "react";
import InputVerification from "../../components/InputVerification";
import Button from "../../components/Button";


class VerificationPage extends BasePage {


    render() {
        return (
            <div className="vh-100">
                <div className="container h-100 d-flex px-lg-5 ">
                    <div className="my-auto mx-auto">
                        <div className="my-3 shadow-sm text-center p-5 bg-white">
                            <i className="bi bi-envelope-open text-muted" style={{fontSize: '5rem'}}></i>
                            <h2 className="mt-3">Verification</h2>
                            <p className="text-muted">
                                Enter the 6-digit code we sent to johncarlo@yahoo.com
                            </p>
                            <InputVerification/>
                            <p className="fs-xs mt-3 m-0">
                                Don't you received any code?
                            </p>
                            <button className="btn btn-link btn-sm fs-sm">
                                Resend code
                            </button>
                            <div className="mt-3 d-grid">
                                <Button>SUBMIT</Button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerificationPage;
