import React from "react";
import Img1 from "./img/unnamed.png";
import Img2 from "./img/Th-c2.png";
import List from "./listUser/list";

export const App = () => {
  return (
    <div className="bigContainer">
      <div className="sideBar"></div>
      <div className="listUser">
        <h2>User List</h2>
        <List username={"Username1"} img={"../img/unnamed.png"} coTime={21} />
        <List username={"Username2"} img={Img2} coTime={41} />
      </div>
    </div>
  );
};
export default App;
