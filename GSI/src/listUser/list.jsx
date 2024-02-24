import React from "react";
import { GoDotFill } from "react-icons/go";
import "./list.css";

export const List = ({ username, img }) => {
  return (
    <div className="bigContainer container-items">
      <span className="pdp">
        <img src={img} alt="user1" className="pdp" />
      </span>
      <div className="user">
        <div className="user-info">
          <p className="username">{username}</p>
          <p className="connected">
            <GoDotFill className="green-dot" />
            Connected
          </p>
        </div>
      </div>
    </div>
  );
};

export default List;
