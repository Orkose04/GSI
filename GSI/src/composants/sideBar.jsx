import React from "react";

import Logo from "../sideBar/logo";
import GeneralBox from "../sideBar/general";
import Access from "../sideBar/accessibilty";

const Sidebar = () => {
  return (
    <div className="sideBar">
      <Logo />
      <GeneralBox />
      <hr />
      <Access />
    </div>
  );
};

export default Sidebar;
