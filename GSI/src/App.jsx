import React from "react";
// import Img1 from "/img/unnamed.png";
// import Img2 from "/img/Th-c2.png";
// import Img3 from "/img/pdp.png";
import List from "./listUser/list";

export const App = () => {
  const userActif = [
    {
      nom: "josie",
      id: 1,
      statue: false,
      ip: "",
      img: "/img/Th-c2.png",
    },
    {
      nom: "Anjoanina",
      id: 2,
      statue: false,
      ip: "",
      img: "/img/unnamed.png",
    },
  ];
  return (
    <div className="bigContainer">
      <div className="sideBar"></div>
      <div className="listUser">
        <h2>User List</h2>
        {userActif.map((user) => (
          <List username={user.nom} key={user.id} img={user.img} />
        ))}
      </div>
    </div>
  );
};
export default App;
