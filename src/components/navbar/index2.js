import React from "react";
import classNames from "../../classNames";
import {Layout} from "nq-component";

const defaultProps = {
    icon: 'bi bi-list',
    logo: '/logo-black.png',
}

function NavBar({className, onToggle, icon, action}) {
    const classes = classNames(className, "navbar navbar-expand-lg navbar-light bg-white");
    const {collapsed, setCollapse} = React.useContext(Layout.Context);

    function click() {
        if (onToggle) {
            onToggle();
        } else {
            setCollapse(!collapsed);
        }
    }

    return (
        <nav className={classes}>
            <div className="container-fluid">
                <button
                    onClick={click}
                    type="button"
                    className="btn btn-sm btn-link fs-4 ps-0 text-dark">
                    <i className={icon}></i>
                </button>
                <div className="d-flex align-items-center">
                    <img
                        className="img-fluid p-0 me-2"
                        src="/logo.svg"
                        width="50"
                        height="50"
                        alt="profile"
                    />
                    <div className="d-flex flex-column text-start">
                        <h6 className="fw-bold m-0 fs-5">MWeeb Inc.</h6>
                    </div>
                </div>
                {action && action() || <div/>}
            </div>
        </nav>
    );
}

NavBar.defaultProps = defaultProps;
export default NavBar;
