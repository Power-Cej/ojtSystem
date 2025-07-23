import React from "react";
import Item from "./Item";
import { Accordion } from "nq-component";

function Child({ menu, onClick, setActiveItem, activeItem }) {
  // Add setActiveItem
  const { name, icon, label, route, id } = menu;
  let key = id || label || name.replaceAll(" ", "");

  return (
    <React.Fragment key={key}>
      <li className="nav-item">
        <Accordion
          eventKey={key}
          className="nav-link font-size-sm text-truncate"
        >
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
          {route.map((m, i) => (
            <Item
              key={i}
              menu={m}
              onClick={onClick}
              setActiveItem={setActiveItem} // ✅ Pass setActiveItem here
              activeItem={activeItem} // ✅ Pass activeItem here
            />
          ))}
        </ul>
      </Accordion.Collapse>
    </React.Fragment>
  );
}

export default Child;
