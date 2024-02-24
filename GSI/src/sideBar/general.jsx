import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

import "./leftnav.css";

const GeneralBox = () => {
  return (
    <div className="Box">
      <p>Generale</p>
      <div className="optBox">
        <h2>Liste</h2>
        <FaClipboardList />
      </div>
      <div className="optBox">
        <h2>Best user</h2>
        <FaUserGroup />
      </div>
      <div className="optBox">
        <h2>Settings</h2>
        <IoMdSettings />
      </div>
    </div>
  );
};

export default GeneralBox;
