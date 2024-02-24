import React, { useState } from "react";
import { RiRefreshFill } from "react-icons/ri";
import "./App.css";
import List from "./listUser/list";
import Logo from "./sideBar/logo";
import GeneralBox from "./sideBar/general";
import Access from "./sideBar/accessibilty";

export const App = () => {
  const [userActif, setUserActif] = useState([]);
  const handleRefresh = () => {
    fetch("http://localhost:5000/gsi/users/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let tmp = [...data];
        tmp = tmp.filter((user) => user.statue == true);
        setUserActif(tmp);
        console.log(userActif);
      });
  };
  setInterval(handleRefresh, 10000);
  return (
    <div className="bigContainer">
      <div className="sideBar">
        <Logo />
        <GeneralBox />
        <hr />
        <Access />
      </div>
      <div className="listUser">
        <div className="titleUser">
          <h2>User List</h2>
          <button onClick={handleRefresh}>
            <RiRefreshFill className="iconRefresh" />
          </button>
        </div>
        {userActif.map((user) => (
          <>
            <br />
            <List username={user.nom} key={user.id} img={user.img} />
            <br />
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};
export default App;
