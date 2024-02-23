import React from "react";
import "./App.css";
import Logo from "./sideBar/logo";
import GeneralBox from "./sideBar/general";
import Acces from "./sideBar/acces";

const App = () => {
  return (
    <div className="bigContainer">
      <div className="sideBar">
        <Logo />
        <GeneralBox />
        <hr />
        <Acces />
      </div>
      <div className="listUser"></div>
    </div>
  );
};

export default App;
