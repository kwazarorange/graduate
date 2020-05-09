import React from "react";
import {connect} from "react-redux";
import "./ColorCircle.scss"

const ColorCircle = ({color}) => {
  return (
    <span className="dot" style={{backgroundColor: color}}></span>
  );
};



export default ColorCircle;
