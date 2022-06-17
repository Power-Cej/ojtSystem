import React from 'react';

class AccessDeniedPage extends React.Component {
    render() {
        return (
            <div className="vh-100 d-flex align-items-center">
                <div className="container text-center w-50">
                    <i className="bi bi-lock fs-1"/>
                    &nbsp;<h1 className="d-inline">403</h1>
                    <h1>Access Denied</h1>
                    <p>You don't have permission to access this page</p>
                </div>
            </div>
        );
    }
}

export default AccessDeniedPage;
