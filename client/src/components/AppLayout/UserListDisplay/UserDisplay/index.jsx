import React from "react";
import { connect } from "react-redux";
import "./UserDisplay.scss";

const ColorCircle = ({ color }) => {
  return <span className="userColor" style={{ backgroundColor: color }}></span>;
};

const UserDisplay = ({ color, name }) => {
  return (
    <li className="userLi">
      <ColorCircle color={color} />
      <p className="userName">{name}</p>
    </li>
  );
};

export default UserDisplay;
