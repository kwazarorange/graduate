import React from "react";
import { connect } from "react-redux";
import tinycolor from "tinycolor2";

const ColorCircle = ({ color }) => {
  return <span className="userColor" style={{ background: `radial-gradient(circle, ${color} 50%, ${tinycolor(color).lighten(15)} 85%)` }}></span>;
};

const UserDisplay = ({ color, name }) => {
  return (
    <li className="userLi">
      <ColorCircle color={color} />
      <span className="userName" style={{ backgroundColor: tinycolor(color).darken(50)}}>{name}</span>
    </li>
  );
};

export default UserDisplay;
