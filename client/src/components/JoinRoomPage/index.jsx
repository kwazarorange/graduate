import React, { useState } from "react";
import { navigate } from "@reach/router";
import "./JoinRoomPage.scss";

const JoinRoomPage = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    navigate("/", {state: { name: name, room: room }, replace: true});
  }
  return (
    <div className="JoinRoomPage">
      <form  onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} name="name" />
        <label htmlFor="room">
          Room:
          </label>
          <input type="text" value={room} onChange={e => setRoom(e.target.value)} name="room" />
        <input type="submit" value="Submit" />
      </form>
      </div>
  );
};

export default JoinRoomPage;
