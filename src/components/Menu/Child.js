import React from "react";
import {Accordion} from "nq-component";
import Item from "./Item";


function Child({name, label, icon, route, id}) {
    let key = id || name.replaceAll(' ', '');
    return (
        <React.Fragment key={key}>
            <li className="nav-item">
                <Accordion
                    eventKey={key}
                    className="nav-link font-size-sm text-truncate">
                    <div className="d-inline">
                        <i className={icon}></i>
                        <span className="ms-2">{label || name}</span>
                    </div>
                    <div className="float-end p-1">
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </Accordion>
            </li>
            <Accordion.Collapse eventKey={key}>
                <ul className="navbar-nav ms-4">
                    {route.map((m, i) => {
                        return <Item {...m}/>
                    })}
                </ul>
            </Accordion.Collapse>
        </React.Fragment>
    );
}


export default Child;