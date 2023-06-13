import React from "react";
import Child from "./Child";
import classNames from "../../classNames";

const defaultIcon = "bi bi-journal-text";

function Item({menu, onClick}) {
    const {name, icon, label, disabled} = menu;
    const route = menu.route || '/collection/' + name;
    if (Array.isArray(route)) {
        return <Child {...menu}/>
    }
    return (
        <li className="nav-item" key={route}>
            <a
                onClick={(e) => onClick(e, menu)}
                href={route} className={classNames("nav-link text-truncate", disabled ? 'disabled' : '')} to={route}>
                <i className={icon || defaultIcon}></i>
                <span className="ms-2">{label || name}</span>
            </a>
        </li>
    )
}

export default Item;