import ReconnectingWebSocket from "reconnecting-websocket";
import ShareDB from "sharedb/lib/client";
import richText from "rich-text";
import { updateHtml, updateWithDelta } from "../../../workSlice";
import store from "../../../../store.js";
ShareDB.types.register(richText.type);

const socket = new ReconnectingWebSocket("ws://" + "55.55.55.5:8080");
const connection = new ShareDB.Connection(socket);

const doc = connection.get("examples", "richtext");

const onLoad = () => {
  store.dispatch(updateHtml({ editor: doc.data }));
};
const onOperation = (op, source) => {
  if (source == "quill") {
    return;
  } else {
    console.log("op received");
    store.dispatch(updateWithDelta({ delta: op }));
  }
};
doc.subscribe(console.log("subscribed"));
doc.on("load", onLoad);
doc.on("op", onOperation);

export default doc;

const onDisconnect = () => {
  connection.close();
};

const onConnect = () => {
  var socket = new ReconnectingWebSocket("ws://" + "55.55.55.5:8080");
  connection.bindToSocket(socket);
};

const submitChange = delta => {
  console.log("Submitting delta...");
  doc.submitOp(delta, { source: "quill" });
};
//
export { onDisconnect, onConnect, submitChange };
