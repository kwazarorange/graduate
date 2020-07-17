import React from 'react';
import Display from './Display';
import TextAreaGrid from "./TextAreaGrid";
import TopBar from './TopBar';

const AppLayout = props => {
  return (
    <div className="appLayout">
      <TopBar />
      <div className="appLayout row">
      <TextAreaGrid roomInfo={props.location.state} />
      <Display />
      </div>
    </div>
  );
}

export default AppLayout;
