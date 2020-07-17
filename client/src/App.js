import React from 'react';
import { Router } from "@reach/router";
import AppLayout from './components/AppLayout';
import JoinRoomPage from "./components/JoinRoomPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <JoinRoomPage path="/" />
        <AppLayout path="/app" />
      </Router>
    </div>
  );
}

export default App;
