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
      className="shadow-sm bg-primary"
      // title="DASHBOARD"
      logo="/logo.svg"
      onClickNavigate={onClickNavigate}
      {...props}
    />
  );
}

export default NavBar;
