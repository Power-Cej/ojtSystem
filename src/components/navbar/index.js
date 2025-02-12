import React from "react";
import { Layout } from "nq-component";
import NavigationBar from "../NavigationBar";

function NavBar(props) {
  const { collapsed, setCollapse } = React.useContext(Layout.Context);

  function onClickNavigate() {
    setCollapse(!collapsed);
  }

  return (
    <NavigationBar
      className="shadow-sm"
      // title="DASHBOARD"
      logo="/nq-3.png"
      onClickNavigate={onClickNavigate}
      {...props}
    />
  );
}

export default NavBar;
