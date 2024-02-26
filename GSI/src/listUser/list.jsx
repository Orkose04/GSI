import React, { useState, useCallback } from "react";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./list.css";

export const List = ({ username, img, connectedTime }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showMore = useCallback(() => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  }, []);

  return (
    <>
      <div className="userCard">
        <div className="bigContainer container-items">
          <div className="user">
            <div className="pdp">
              <img src={img} alt="user1" className="pdp" />
            </div>
            <div className="right">
              <div className="user-info">
                <p className="username">{username}</p>
                <p className="connected">
                  <GoDotFill className="green-dot" />
                  Connected
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="show-more">
          <BsThreeDotsVertical className="show-more-dots" onClick={showMore} />
        </button>
      </div>
      {showDetails && (
        <div className="details">
          {/* Add the additional information you want to display here */}
          <ul>
            <li>Connected since: {connectedTime}</li>
            <li></li>
            <li></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default List;
