import React from "react";
import List from "../listUser/list";
import { RiRefreshFill } from "react-icons/ri";
import { useState } from "react";
const ListUser = () => {
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
  );
};

export default ListUser;
