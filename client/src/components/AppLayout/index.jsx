import React from 'react';
import Frame from './Frame';
import TextArea from './TextArea';
import "./AppLayout.scss";

const AppLayout = props => {
  return (
    <div className="appLayout">
      <TextArea roomInfo={props.location.state}></TextArea>
      <Frame></Frame>
    </div>
  );
}

export default AppLayout;
