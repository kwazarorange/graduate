import React from "react";
import { connect } from "react-redux";

const ColorCircle = ({ color }) => {
  return <span className="userColor" style={{ backgroundColor: color }}></span>;
};

const UserDisplay = ({ color, name }) => {
  return (
    <li className="userLi">
      <ColorCircle color={color} />
      <span className="userName">{name}</span>
    </li>
  );
};

export default UserDisplay;
