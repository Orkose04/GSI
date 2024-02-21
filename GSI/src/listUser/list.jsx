import React from "react";
import "./list.css";

export const List = ({ username, img, coTime }) => {
  return (
    <div>
      <div className="user">
        <img src={img} alt="user1" className="pdp" />
        <div>
          <p className="username">{username}</p>
          <p>Connected since {coTime}</p>
        </div>
      </div>
    </div>
  );
};

export default List;
