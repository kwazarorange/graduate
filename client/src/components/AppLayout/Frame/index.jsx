import React from "react";
import { connect } from "react-redux";
import "./Frame.scss";

const Frame = ({ html, css, js }) => {
  const document =
    "<style>" + css + "</style>" + html + "<script>" + js + "</script>";
  return (
    <div className="frame">
      <iframe srcDoc={document}></iframe>
    </div>
  );
};

const mapStateToProps = state => ({
  html: state.render.render,
  css: state.render.css,
  js: state.render.js
});

export default connect(
  mapStateToProps,
  null
)(Frame);
