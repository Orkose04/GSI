<<<<<<< Updated upstream
import React from "react";
import Img1 from "./img/unnamed.png";
import Img2 from "./img/Th-c2.png";
import List from "./listUser/list";
=======
import "./App.css";
import Sidebar from "./composants/sideBar";
import ListUser from "./composants/listUser";
>>>>>>> Stashed changes

export const App = () => {
  return (
    <div className="bigContainer">
<<<<<<< Updated upstream
      <div className="sideBar"></div>
      <div className="listUser">
        <h2>User List</h2>
        <List username={"Username1"} img={Img1} coTime={21} />
        <List username={"Username2"} img={Img2} coTime={41} />
      </div>
=======
      <Sidebar />
      <ListUser />
>>>>>>> Stashed changes
    </div>
  );
};
export default App;
