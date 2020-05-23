import React from "react";
import { connect } from "react-redux";
import UserDisplay from "./UserDisplay";

const UserListDisplay = ({ users }) => {
  const userList = users
    .filter(user => user.name)
    .map(user => <UserDisplay color={user.color} name={user.name} />);
  return <ul className="userList">{userList}</ul>;
};

const mapStateToProps = state => ({
  users: state.cursors.cursors
});

export default connect(mapStateToProps, null)(UserListDisplay);
