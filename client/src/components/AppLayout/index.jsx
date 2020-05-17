import React from 'react';
import Display from './Display';
import TextArea from './TextArea';
import TextAreaGrid from "./TextAreaGrid";
import "./AppLayout.scss";

const AppLayout = props => {
  return (
    <div className="appLayout">
      <TextAreaGrid roomInfo={props.location.state} />
      <Display />
    </div>
  );
}

export default AppLayout;
