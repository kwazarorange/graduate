import React from 'react';
import UserListDisplay from "./UserListDisplay";

const TopBar = () => {
  return (
    <div className="topBar">
      <UserListDisplay />
      <button>save</button>
      <button>join</button>
    </div>
  );
}

export default TopBar;
