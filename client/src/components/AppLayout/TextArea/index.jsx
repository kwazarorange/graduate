  // const testEffect = useDocument(reactQuillRef);
  //
  // const onChangeAction = (content, delta, source, editor) => {
  //   console.log("Quill onChange event. Source: ", source);
  //   const editorState = editor.getContents();
  //   const renderState = editor.getText();
  //   console.log(content);
  //   // updateRender({ render: renderState }); THIS IS THE PROBLEM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   // updateRender({ render: "HAHA" });
  //   if (source == "user") {
  //     updateText({ editor: editorState });
  //     submitChange(delta);
  //     return;
  //   }
  // };
  // const useDocument = reactQuillRef => {
  //   const [data, setData] = useState(null);
  //
  //   useEffect(() => {
  //     async function fetchData() {
  //       const data = await subscribeToDocument();
  //       // I NEED TO AWAIT DISPATCH updateHTML, and then setContents... or maybe i should use suspense or something like that
  //       setData(data);
  //       reactQuillRef.current.getEditor().setContents(data);
  //     }
  //     fetchData();
  //     return () => {
  //       console.log("UNSUBBED!");
  //     };
  //   }, [reactQuillRef]);
  //
  //   return data;
  // };
  //
  // const useChanges = doc => {
  //   const [op, setOp] = useState(null);
  //
  //   useEffect(() => {
  //     async function fetchData() {
  //       const data = await subscribeToDocument();
  //       // I NEED TO AWAIT DISPATCH updateHTML, and then setContents... or maybe i should use suspense or something like that
  //       setOp(data);
  //       doc.current.getEditor().setContents(data);
  //     }
  //     fetchData();
  //     return () => {
  //       console.log("UNSUBBED!");
  //     };
  //   }, [doc]);
  //
  //   return op;
  // };
  import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
  import ReactQuill, { Quill } from "react-quill";
  import { connect } from "react-redux";
  import axios from "axios";
  import hljs from "./highlight.js";

  import { updateHtml, updateCss, updateJs, updateRender } from "../../workSlice";
  import "react-quill/dist/quill.bubble.css";
  import "./TextArea.scss";

  import { submitChange } from "./sharedb";
  import "./sharedb";

  const TextArea = ({ textTypes, updateText, updateRender }) => {
    const modules = {
      //syntax: {highlight: html => hljs.highlightAuto(html).value,},
      toolbar: false,
      clipboard: {
        matchVisual: false
      }
    };
    const { html, css, js } = textTypes;
    useEffect(() => {
      reactQuillRef.current.getEditor().setContents(html);
    }, [html]);
    const reactQuillRef = useRef(null);
    // const testEffect = useDocument(reactQuillRef);
    //
    const onChangeAction = (content, delta, source, editor) => {
      const editorState = editor.getContents();
      const renderState = editor.getText();
      // updateRender({ render: renderState });
      if (source == "user") {
        updateText({ editor: editorState });
        submitChange(delta);
      }
    };

    return (
      <div>
        {
          <ReactQuill
            ref={reactQuillRef}
            className="textArea"
            value={html}
            theme="bubble"
            onChange={onChangeAction}
            modules={modules}
          />
        }
      </div>
    );
  };

  const mapStateToProps = state => ({
    textTypes: { html: state.html.editorState, css: state.css, js: state.js }
  });
  const mapDispatchToProps = {
    updateText: updateHtml,
    updateRender: updateRender
  };

  export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
