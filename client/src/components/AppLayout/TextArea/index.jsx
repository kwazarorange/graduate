import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import QuillCursors from "quill-cursors";
import { connect } from "react-redux";
import hljs from "./highlight.js";
import EditorBar from "./EditorBar";
import {
  addCursor,
  updateCursor,
  deleteCursor,
} from "../../../store/cursorsSlice";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import Linter from "./Linter";
import Document, { PRESENCE_CHANGE, DOCUMENT_CHANGE } from "./sharedb";

Quill.register("modules/cursors", QuillCursors);
Quill.register("modules/linter", Linter);

const TextArea = ({
  cursorState,
  addCursor,
  deleteCursor,
  updateCursor,
  collection,
  roomInfo,
  updateStore,
  presenceId,
  linterState,
}) => {
  const quillRef = useRef(null);
  const doc = useDocument({ collection, roomInfo, presenceId }, quillRef);
  const cursors = useCursorsModule(quillRef, collection, cursorState);
  useChangeNotifications(
    cursorState,
    { addCursor, deleteCursor, updateCursor },
    doc,
    quillRef,
    cursors
  );

  const onChange = (content, delta, source, editor) => {
    quillRef.current
      .getEditor()
      .formatLine(0, quillRef.current.getEditor().getLength(), {
        "code-block": true,
      });
    if (source === "user") {
      doc.submitChange(delta);
    }
    const renderState = editor.getText();
    updateStore(renderState);
  };
  const onChangeSelection = (range, source, editor) => {
    if (range && range.index >= 0) {
      range.name = roomInfo.name;
      doc.submitPresence(range);
    } else if (!range && source === "user") {
      doc.submitPresence(null);
    }
  };
  const modules = {...TextArea.modules, linter: collection == 'js' ? true : false};
  return (
    <div className="textArea">
      <EditorBar editor_language={collection} />
      <ReactQuill
        ref={quillRef}
        classname="quill"
        defaultValue={{
          ops: [{ attributes: { "code-block": true }, insert: "\n" }],
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
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: false,
  clipboard: {
    matchVisual: false,
  },
  linter: true,
  history: {
    userOnly: true,
  },
  cursors: true,
};

function useDocument(documentInfo, ref) {
  const doc = useMemo(
    () =>
      new Document(
        "collab-code.herokuapp.com",
        documentInfo.collection,
        documentInfo.roomInfo.room,
        documentInfo.presenceId,
        documentInfo.roomInfo.name
      ),
    []
  );
  useEffect(() => {
    doc.subscribe();
  }, []);

  return doc;
}

function manageCursors(cursorState, actions, collection, cursors, data) {
  const cursor = {
    id: data.id,
    name: data.range ? data.range.name : null,
    range: data.range,
  };
  const cursorsState = cursorState.filter(
    (cursor) => cursor.collection === collection
  );
  // if this is a new cursor: addCursor
  if (!cursorsState.find((curs) => curs.id === cursor.id)) {
    const dispatchData = Object.assign({ collection }, { cursor });
    actions.addCursor(dispatchData);
    return;
  } else {
    // if range is null: deleteCursor
    if (!cursor.range) {
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
}

function useChangeNotifications(cursorState, actions, doc, ref, cursors) {
  useEffect(() => {
    if (ref.current) {
      function onChangeReceived(type, change) {
        switch (type) {
          case PRESENCE_CHANGE:
            manageCursors(
              cursorState,
              actions,
              doc.collection,
              cursors,
              change
            );
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
}

function useCursorsModule(ref, collection, cursorState) {
  let [cursors, setCursors] = useState(null);
  // retrieve cursors module
  useEffect(() => {
    if (ref.current) {
      setCursors(ref.current.getEditor().getModule("cursors"));
    }
  }, [ref]);

  // draw cursors from the redux state
  useEffect(() => {
    if (cursors && cursorState) {
      const cursorsState = cursorState.filter(
        (cursor) => cursor.collection === collection
      );
      cursors.clearCursors();
      cursorsState.forEach((cursor) => {
        cursors.createCursor(cursor.id, cursor.name, cursor.color);
        cursors.moveCursor(cursor.id, cursor.range);
      });
    }
  }, [cursorState]);
  return cursors;
}

const mapDispatchToProps = {
  addCursor: addCursor,
  updateCursor: updateCursor,
  deleteCursor: deleteCursor,
};
const mapStateToProps = (state) => ({
  cursorState: state.cursors.cursors,
  linterState: state.linter.js,
});

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
