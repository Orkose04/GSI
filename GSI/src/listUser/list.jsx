import React from "react";
import "./list.css";

export const List = ({ username, img, coTime }) => {
  let isConnected = true;
  return (
    <div className="bigContainer container-items">
      <span className="pdp">
        <img src={img} alt="user1" className="pdp" />
      </span>
      <div className="user">
        <div className="user-info">
          <p className="username">{username}</p>
          <p className="cotime">{isConnected ? "C" : "Disc"}onnected</p>
        </div>
      </div>
    </div>
  );
};

export default List;
