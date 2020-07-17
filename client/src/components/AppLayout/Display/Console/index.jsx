import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Console = ({ messageList }) => {
  const messages = messageList.map((message) => (
    <Message key={uuidv4()} {...message} />
  ));
  return <ul className="console">{messages}</ul>;
};

const Message = ({ type, message }) => {
  return (
    <li className={"message " + type}>
      <div className="message-text">{message.message}</div>
      <div className="message-url">{message.line}</div>
    </li>
  );
};

const mapStateToProps = (state) => ({
  messageList: state.console.messages,
});

export default connect(mapStateToProps, null)(Console);
