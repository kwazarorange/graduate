import React, {useState, useEffect} from "react";
import Frame from "./Frame";
import Console from "./Console";
import "./Display.scss";


const Display = ({}) => {

  return(
    <div className="display">
      <Frame />
      <Console />
    </div>
  );
}

export default Display;
