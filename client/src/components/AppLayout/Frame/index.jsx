import React from "react";
import { connect } from "react-redux";
import "./Frame.scss";

const Frame = ({ html, css, js }) => {
  const document =
    "<style>" + css + "</style>" + "<script>" + js + "</script>" + html;
  return (
    <div className="frame">
      <iframe srcDoc={document}></iframe>
    </div>
  );
};

const mapStateToProps = state => ({
  html: state.html.renderState,
  css: state.css,
  js: state.js
});

export default connect(
  mapStateToProps,
  null
)(Frame);
