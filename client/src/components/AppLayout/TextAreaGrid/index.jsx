import React from "react";
import { connect } from "react-redux";
import { updateHtml, updateCss, updateJs } from "../../workSlice";
import TextArea from "./TextArea";
import "./TextAreaGrid.scss";

const TextAreaGrid = ({ textTypes, updateHtml, updateCss, updateJs }) => {
  const { html, css, js } = textTypes;
  return (
    <div className="textAreaGrid">
      <TextArea text={html} updateText={updateHtml} />
      <TextArea text={css} updateText={updateCss} />
      <TextArea text={js} updateText={updateJs} />
    </div>
  );
};

const mapStateToProps = state => ({
  textTypes: { html: state.html, css: state.css, js: state.js }
});


const mapDispatchToProps = { updateHtml, updateCss, updateJs };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextAreaGrid);
