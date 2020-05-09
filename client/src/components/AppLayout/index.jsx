import React from 'react';
import Frame from './Frame';
import TextArea from './TextArea';
import TextAreaGrid from "./TextAreaGrid";
import "./AppLayout.scss";

const AppLayout = props => {
  return (
    <div className="appLayout">
      <TextAreaGrid roomInfo={props.location.state} />
      <Frame></Frame>
    </div>
  );
}

export default AppLayout;
