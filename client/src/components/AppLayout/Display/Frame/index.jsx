import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addMessage } from "../../../../store/consoleSlice";

const Frame = ({ html, css, js, packages, externalCss, addMessage }) => {
  const [document, setDocument] = useState("");
  const packagesScriptList = packages.map(pckg => `<script crossorigin src='${pckg}'></script>`)
  const cssExternalList = externalCss.map(css => `<link rel="stylesheet" type="text/css" href="${css}">`)
  useEffect(() => {
    let timer = null;
    timer = setTimeout(() => {
      const scriptType = (!!packagesScriptList.length) ? "<script type='text/babel'>" : '<script>';
      setDocument(
        packagesScriptList +
        Frame.sendMessageScript +
          "<style>" +
          css +
          "</style>" +
          cssExternalList +
          html +
          scriptType +
          js +
          "</script>"
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [html, css, js]);
  const onMessageReceived = event => {
    if (event.data && event.data.source == "iframe") {
      addMessage({ message: event.data.message, type: event.data.type });
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
  js: state.render.js,
  packages: state.render.packages,
  externalCss: state.render.externalCss
});

const mapDispatchToProps = {
  addMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
