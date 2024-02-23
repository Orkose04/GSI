import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";

import "./general.css";

const Acces = () => {
  return (
    <div className="Box">
      <p>Generale</p>
      <div className="optBox">
        <h2>Show all user</h2>
        <IoEyeSharp />
      </div>
      <div className="optBox">
        <h2>Best user</h2>
        <MdDarkMode />
      </div>
      <div className="optBox">
        <h2>Log out</h2>
        <BiSolidLogOut />
      </div>
    </div>
  );
};

export default Acces;
