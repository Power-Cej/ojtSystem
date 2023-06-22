import React from "react";
import {NavBar as Nav} from "nq-component";

function NavBar(props) {
    return <Nav
        className="shadow-sm"
        title="DASHBOARD"
        {...props}/>
}

export default NavBar;
