import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { connect } from "react-redux";
import axios from "axios";
import hljs from "./highlight.js";

import { updateRender, updateWithDelta } from "../../workSlice";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import "./TextArea.scss";
import doc from "./sharedb";

const useShareDBDocument = onChangeReceived => {
  useEffect(() => {
    doc.attach(onChangeReceived);
    return () => doc.detach();
  }, [onChangeReceived]);
};

const TextArea = ({ textTypes, updateText, updateRender, updateW }) => {
  const modules = {
    syntax: {
      highlight: text => hljs.highlightAuto(text).value
    },
    toolbar: false,
    clipboard: {
      matchVisual: false
    },
    history: {
      userOnly: true
    }
  };
  const quillRef = useRef(null);
  const onChangeReceived = delta => {
    quillRef.current.getEditor().updateContents(delta);
  };
  useShareDBDocument(onChangeReceived);
  const onChange = (content, delta, source, editor) => {
    if (source == "user") {
      doc.submitChange(delta);
    }
    const renderState = editor.getText();
    updateRender({ render: renderState });
  };
  const onChangeSelection = (range, source, editor) => {
    console.log(range, source);
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        className="textArea"
        defaultValue={{
          ops: [
            { attributes: {"code-block": true},
              insert: "\n" }
          ]
        }}
        theme="bubble"
        onChange={onChange}
        onChangeSelection={onChangeSelection}
        modules={modules}
      />
    </div>
  );
};

const mapDispatchToProps = {
  updateRender: updateRender,
  updateWithDelta: updateWithDelta
};

export default connect(null, mapDispatchToProps)(TextArea);
