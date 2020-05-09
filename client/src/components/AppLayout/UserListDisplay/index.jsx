import React from "react";
import { connect } from "react-redux";
import ColorCircle from "./ColorCircle";
import "./UserListDisplay.scss";

const UserListDisplay = ({ users }) => {
  const userList = users.map(user => (
    <li>
      <ColorCircle color={user.color} />
      <p>{user.name}</p>
    </li>
  ));
  return <ul className="userList" >{userList}</ul>;
};

const mapStateToProps = state => ({
  users: state.cursors.users
});

export default connect(mapStateToProps, null)(UserListDisplay);
