import React, { useState } from "react";
import Item from "./Item";

function Menu({ menus, onClickItem }) {
  const [activeItem, setActiveItem] = useState(null);

  function renderDivider(index) {
    return <hr key={index} className="dropdown-divider bg-light" />;
  }

  return (
    <ul className="navbar-nav">
      {menus.map((menu, i) => {
        if (!Object.keys(menu).length) return renderDivider(i);
        const key = menu.key || menu.route || "menu-" + i;
        return (
          <Item
            key={key}
            menu={menu}
            onClick={onClickItem}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        );
      })}
    </ul>
  );
}

export default Menu;
