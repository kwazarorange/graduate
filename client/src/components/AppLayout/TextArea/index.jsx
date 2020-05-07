import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import QuillCursors from "quill-cursors";
import { connect } from "react-redux";
import hljs from "./highlight.js";

import { updateRender } from "../../workSlice";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import "./TextArea.scss";
import Document, { PRESENCE_CHANGE, DOCUMENT_CHANGE } from "./sharedb";
import tinycolor from "tinycolor2";

Quill.register("modules/cursors", QuillCursors);

const useDocument = (id, ref) => {
  const doc = useMemo(
    () => new Document("55.55.55.5:8080", "examples", id),
    []
  );
  let [cursors, setCursors] = useState(null);
  useEffect(() => {
    doc.subscribe();
    console.log(doc.document.type);
  }, []);
  useEffect(() => {
    if (ref.current) {
      setCursors(ref.current.getEditor().getModule("cursors"));
    }
  }, [ref]);
  useSubscription(doc, ref, cursors);
  return [doc, cursors];
};
const manageCursors = (cursors, data) => {
  const range = data.range;
  const cursor = {
    id: data.id,
    name: data.range ? data.range.name : null,
    color: tinycolor.random().toHexString(),
  };
  if (range) {
    console.log(cursor, range)
    cursors.createCursor(cursor.id, cursor.name, cursor.color);
    cursors.moveCursor(cursor.id, range)
  } else {
    cursors.removeCursor(cursor.id)
  }
};

const useSubscription = (doc, ref, cursors) => {
  useEffect(() => {
    if (ref.current) {
      function onChangeReceived(type, change) {
        switch (type) {
          case PRESENCE_CHANGE:
            manageCursors(cursors, change);
            break;
          case DOCUMENT_CHANGE:
            ref.current.getEditor().updateContents(change);
            break;
          default:
            break;
        }
      }
      doc.attach(onChangeReceived);
    }
    return () => doc.detach();
  }, [ref, cursors, doc]);
};

const useCursorsModule = ref => {
  let [cursors, setCursors] = useState(null);
  useEffect(() => {
    if (ref.current) {
      setCursors(ref.current.getEditor().getModule("cursors"));
    }
  }, [ref]);
  return cursors;
};

const TextArea = ({ roomInfo, updateRender }) => {
  const quillRef = useRef(null);
  const [doc, cursors] = useDocument(roomInfo.room, quillRef);

  const onChange = (content, delta, source, editor) => {
    if (source == "user") {
      doc.submitChange(delta);
    }
    const renderState = editor.getText();
    updateRender({ render: renderState });
  };
  const onChangeSelection = (range, source, editor) => {
    // console.log(range, typeof range);
    if (range && range.index>=0) {
      range.name = roomInfo.name;
      doc.submitPresence(range);
    }
  };

  return (
    <div className="textArea">
      <ReactQuill
        ref={quillRef}
        classname="quill"
        defaultValue={{
          ops: [{ attributes: { "code-block": true }, insert: "\n" }]
        }}
        theme="bubble"
        onChange={onChange}
        onChangeSelection={onChangeSelection}
        modules={TextArea.modules}
      />
    </div>
  );
};
TextArea.modules = {
  syntax: {
    highlight: text => hljs.highlightAuto(text).value
  },
  toolbar: false,
  clipboard: {
    matchVisual: false
  },
  history: {
    userOnly: true
  },
  cursors: true
};

const mapDispatchToProps = {
  updateRender: updateRender
};

export default connect(null, mapDispatchToProps)(TextArea);
