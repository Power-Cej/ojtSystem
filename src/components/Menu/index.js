import React from "react";
import {NavLink} from 'react-router-dom';
import Accordion from "../Accordion";

function Menu({menus}) {
    function renderItemWithChild(menu) {
        const {name, icon, route} = menu;
        let key = name;
        return (
            <React.Fragment key={key}>
                <li className="nav-item">
                    <Accordion
                        eventKey={key}
                        className="nav-link font-size-sm">
                        <div className="d-inline-block">
                            <i className={icon}></i>
                            <span className="ms-2">{name}</span>
                        </div>
                        <div className="float-end p-1">
                            <i className="bi bi-chevron-down"></i>
                        </div>
                    </Accordion>
                </li>
                <Accordion.Collapse eventKey={key}>
                    <ul className="navbar-nav ms-4">
                        {route.map((m, i) => {
                            return renderItem(m);
                        })}
                    </ul>
                </Accordion.Collapse>
            </React.Fragment>
        );
    }

    function renderItem(menu) {
        const {name, icon} = menu;
        const route = menu.route || '/class/' + name;
        if (Array.isArray(route)) {
            return renderItemWithChild(menu);
        }
        return (
            <li className="nav-item" key={route}>
                <NavLink className="nav-link" to={route}>
                    <i className={icon}></i>
                    <span className="ms-2">{name}</span>
                </NavLink>

            </li>
        )
    }

    function renderDivider(index) {
        return (<hr key={index} className="dropdown-divider bg-light"/>)
    }


    return (
        <ul className="navbar-nav">
            {/*<li>*/}
            {/*    <div className="text-muted small fw-bold text-uppercase">Features</div>*/}
            {/*</li>*/}
            {
                menus.map((menu, i) => {
                    if (!Object.keys(menu).length) return renderDivider(i);
                    return renderItem(menu);
                })
            }

        </ul>

    );
}

export default Menu;
