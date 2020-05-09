import React from "react";
import TextArea from "../TextArea";
import UserListDisplay from "../UserListDisplay";
import { v4 as uuidv4 } from 'uuid';
import "./TextAreaGrid.scss";
import { connect } from "react-redux";
import { updateRender, updateCss, updateJs } from "../../../store/workSlice";

const TextAreaGrid = ({ roomInfo, updateRender, updateCss, updateJs }) => {
  const presenceId = uuidv4();
  return (
    <div className="textAreaGrid">
      <TextArea collection="html" roomInfo={roomInfo} presenceId={presenceId} updateStore={updateRender}/>
      <TextArea collection="css" roomInfo={roomInfo} presenceId={presenceId} updateStore={updateCss}/>
      <TextArea collection="js" roomInfo={roomInfo} presenceId={presenceId} updateStore={updateJs}/>
      <UserListDisplay />
    </div>
  );
};

const mapDispatchToProps =  {
  updateRender: updateRender,
  updateCss: updateCss,
  updateJs: updateJs
};

export default connect(null, mapDispatchToProps)(TextAreaGrid);
