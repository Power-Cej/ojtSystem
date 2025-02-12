import React from "react";
import Child from "./Child";
import classNames from "../../classNames";
import "./Styles.css";

const defaultIcon = "bi bi-journal-text";
const defaultProps = {
  onClick: () => {},
};

function Item({ menu, onClick, activeItem, setActiveItem }) {
  const { name, icon, label, disabled } = menu;
  const route = menu.route || "/" + name;
  const isActive = activeItem === route;

  if (Array.isArray(route)) {
    return (
      <Child
        menu={menu}
        onClick={onClick}
        setActiveItem={setActiveItem} // ✅ Pass setActiveItem here
        activeItem={activeItem}
      />
    );
  }

  return (
    <li className="nav-item mb-2" key={route}>
      <a
        onClick={(e) => {
          e.preventDefault();
          if (setActiveItem) setActiveItem(route); // ✅ Ensure setActiveItem exists
          onClick(e, menu);
        }}
        href={route}
        className={`nav-link text-truncate ${
          isActive ? " text-white p-2" : "text-dark"
        } ${disabled ? "disabled" : ""}`}
        style={{
          borderRadius: "5px",
          backgroundColor: `${isActive ? "#006BAC" : ""}`,
        }}
      >
        <i className={icon || "bi bi-journal-text"}></i>
        <span className="ms-2">{label || name}</span>
      </a>
    </li>
  );
}

Item.defaultProps = defaultProps;
export default Item;
