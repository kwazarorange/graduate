import React from "react";
import { navigate } from "@reach/router";
import UserListDisplay from "./UserListDisplay";

const TopBar = () => {
  return (
    <div className="topBar">
      <UserListDisplay />
      <button onClick={() => { navigate("/", {}, { replace: true }); }}>
        Join Session
      </button>
    </div>
  );
};

export default TopBar;
