import React from "react";
import List from "../listUser/list";
import { RiRefreshFill } from "react-icons/ri";
import { useState } from "react";
import Img from "/img/user1.png";
const ListUser = () => {
  const [userActif, setUserActif] = useState([]);
  const handleRefresh = () => {
    fetch("http://192.168.88.27:5000/gsi/users/")
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
    <div className="listUser">
      <div className="titleUser">
        <h2>User List</h2>
        <button onClick={handleRefresh}>
          <RiRefreshFill className="iconRefresh" />
        </button>
      </div>
      <List
        username={"TestUser"}
        key={2}
        img={Img}
        connectedTime={"5 seconds"}
        IP={"12.34.56.78"}
        Signal={-61}
      />
      <List
        username={"TestUser2"}
        key={2}
        img={Img}
        connectedTime={"50 minutes"}
        IP={"87.65.43.21"}
        Signal={-109}
      />
      {userActif.map((user) => (
        <>
          <br />
          <List
            username={user.nom}
            key={user.id}
            img={user.img}
            connectedTime={1}
          />
          <br />
          <hr />
        </>
      ))}
    </div>
  );
};

export default ListUser;
