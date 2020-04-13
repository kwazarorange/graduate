import React from 'react';
import Frame from './Frame';
import TextArea from './TextArea';
import "./AppLayout.scss";

const AppLayout = () => {
  return (
    <div className="appLayout">
      <TextArea></TextArea>
      <Frame></Frame>
    </div>
  );
}

export default AppLayout;
