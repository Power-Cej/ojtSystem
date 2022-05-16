import React from 'react';
import {Link} from "react-router-dom";

class OfflinePage extends React.Component {
    render() {
        return (
            <div className="vh-100 d-flex align-items-center">
                <div className="container text-center">
                    <img className="img-fluid login-img" width="400"
                         src="/assets/images/under-construction.svg" alt="banner"/>
                    <h2 className="mt-3 fw-bold">No internet Connection.</h2>
                    <p>
                        Make sure Wi-Fi is on, Airplane Mode is off and try again.
                    </p>
                    <Link className="btn btn-primary btn-sm" to="/categories">RETRY</Link>
                </div>
            </div>
        );
    }
}

export default OfflinePage;
