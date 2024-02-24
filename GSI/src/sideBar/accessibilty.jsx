import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";

import "./leftnav.css";

const Access = () => {
  return (
    <div className="Box">
      <p>Accessibility</p>
      <div className="optBox">
        <h2>Show all users</h2>
        <IoEyeSharp />
      </div>
      <div className="optBox">
        <h2>Best users</h2>
        <MdDarkMode />
      </div>
      <div className="optBox">
        <h2>Log out</h2>
        <BiSolidLogOut />
      </div>
    </div>
  );
};

export default Access;