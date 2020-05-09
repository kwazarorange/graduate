import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import QuillCursors from "quill-cursors";
import { connect } from "react-redux";
import hljs from "./highlight.js";
import {
  addCursor,
  updateCursor,
  deleteCursor
} from "../../../store/cursorsSlice";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import "./TextArea.scss";
import Document, { PRESENCE_CHANGE, DOCUMENT_CHANGE } from "./sharedb";

Quill.register("modules/cursors", QuillCursors);

const useDocument = (cursorState, actions, documentInfo, ref) => {
  const doc = useMemo(
    () =>
      new Document(
        "55.55.55.5:8080",
        documentInfo.collection,
        documentInfo.roomInfo.room,
        documentInfo.presenceId
      ),
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
  useSubscription(
    cursorState,
    actions,
    documentInfo.collection,
    doc,
    ref,
    cursors
  );
  return [doc, cursors];
};
const manageCursors = (cursorState, actions, collection, cursors, data) => {
  const cursor = {
    id: data.id,
    name: data.range ? data.range.name : null,
    range: data.range
  };
  const cursorsState = cursorState.filter(cursor => cursor.collection == collection);
  // if this is a new cursor: addCursor
  if (!cursorsState.find(curs => curs.id == cursor.id)) {
    const dispatchData = Object.assign({ collection }, { cursor });
    actions.addCursor(dispatchData);
    return;
  } else {
    // if range is null: deleteCursor
    if (!cursor.range) {
      // const dispatchData = Object.assign({ collection }, { id: cursor.id });
      // actions.deleteCursor(dispatchData);
      cursors.removeCursor(cursor.id);
    } else {
      // if this cursor id exists in this collection: updateCursor
      const dispatchData = Object.assign(
        { collection },
        { id: cursor.id },
        { range: cursor.range }
      );
      actions.updateCursor(dispatchData);

    }
  }
};

const useSubscription = (
  cursorState,
  actions,
  collection,
  doc,
  ref,
  cursors
) => {
  useEffect(() => {
    if (ref.current) {
      function onChangeReceived(type, change) {
        console.log("RECEIVED CHANGE: ", type, change);
        switch (type) {
          case PRESENCE_CHANGE:
            manageCursors(cursorState, actions, collection, cursors, change);
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
  }, [ref, cursors, doc, cursorState]);
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

const TextArea = ({
  cursorState,
  addCursor, deleteCursor, updateCursor,
  collection,
  roomInfo,
  updateStore,
  presenceId
}) => {
  const quillRef = useRef(null);
  const [doc, cursors] = useDocument(
    cursorState,
    {addCursor, deleteCursor, updateCursor},
    { collection, roomInfo, presenceId },
    quillRef
  );
  useEffect(() => {
    if (cursors && cursorState) {
      const cursorsState = cursorState.filter(cursor => cursor.collection == collection);
      cursors.clearCursors();
      cursorsState.forEach(cursor => {
        cursors.createCursor(cursor.id, cursor.name, cursor.color);
        cursors.moveCursor(cursor.id, cursor.range)
      })
    }
  }, [cursorState]);

  const onChange = (content, delta, source, editor) => {
    quillRef.current
      .getEditor()
      .formatLine(0, quillRef.current.getEditor().getLength(), {
        "code-block": true
      });
    if (source == "user") {
      doc.submitChange(delta);
    }
    const renderState = editor.getText();
    updateStore(renderState);
  };
  const onChangeSelection = (range, source, editor) => {
    if (range && range.index >= 0) {
      range.name = roomInfo.name;
      doc.submitPresence(range);
    } else if (!range && source == "user") {
      doc.submitPresence(null);
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

const mapDispatchToProps =  {
  addCursor: addCursor,
  updateCursor: updateCursor,
  deleteCursor: deleteCursor
};
const mapStateToProps = (state) => ({
  cursorState: state.cursors.cursors
});

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
