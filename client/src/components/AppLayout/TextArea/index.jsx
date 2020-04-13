import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import { connect } from "react-redux";
import axios from "axios";

import { updateHtml, updateCss, updateJs } from "../../workSlice";
import "react-quill/dist/quill.snow.css";
import "./TextArea.scss";

const TextArea = ({ textTypes, updateText }) => {
  const { html, css, js } = textTypes;
  const reactQuillRef = useRef(null);
  let quillRef = useRef(null);

  useEffect(() => {
    if (typeof reactQuillRef.current.getEditor !== "function") return;
    quillRef.current = reactQuillRef.current.getEditor();
  }, [reactQuillRef]);

  const onChangeAction = (content, delta, source, editor) => {
    updateText({ editor: content, render: editor.getText() });
    postChangeDelta(delta);
    //update state (html with content, iframe with getText)
    //send delta object
  };
  const postChangeDelta = delta => {
    const jsonDelta = JSON.stringify(delta);
    axios
      .post("/postDelta/", { delta: jsonDelta })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <ReactQuill
        ref={reactQuillRef}
        className="textArea"
        value={html}
        theme="snow"
        onChange={onChangeAction}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  textTypes: { html: state.html.editorState, css: state.css, js: state.js }
});
const mapDispatchToProps = {
  updateText: updateHtml
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextArea);
