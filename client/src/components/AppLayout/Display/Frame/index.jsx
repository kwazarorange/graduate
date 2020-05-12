import React from "react";
import { connect } from "react-redux";
import {addMessage} from "../../../../store/consoleSlice";
import "./Frame.scss";


const Frame = ({ html, css, js, addMessage }) => {
  const document =
    Frame.sendMessageScript +
    "<style>" +
    css +
    "</style>" +
    html +
    "<script>" +
    js +
    "</script>";
  const onMessageReceived = event => {
    if (event.data && event.data.source == "iframe") {
      console.log(event.data);
      addMessage({message: event.data.message, type: event.data.type})
    }
  };
  window.addEventListener("message", onMessageReceived, false);

  return (
    <div className="frame">
      <iframe srcDoc={document}></iframe>
    </div>
  );
};
Frame.sendMessageScript = `
<script>
  const _log = console.log;
  console.log = function(...rest) {
    window.parent.postMessage(
      {
        source: 'iframe',
        type: 'console',
        message: {message: rest[0]},
      },
      '*'
    );
    _log.apply(console, arguments);
  };
  window.onerror = function(message, url, line, col, errorObj) {
    window.parent.postMessage(
      {
        source: 'iframe',
        type: 'error',
        message: {message, url, line, col},
      },
      '*'
    );
  };
</script>`;

const mapStateToProps = state => ({
  html: state.render.render,
  css: state.render.css,
  js: state.render.js
});

const mapDispatchToProps = {
  addMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
