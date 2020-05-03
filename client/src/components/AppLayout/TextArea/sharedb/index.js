import ReconnectingWebSocket from "reconnecting-websocket";
import ShareDB from "sharedb/lib/client";
import richText from "rich-text";
import { updateHtml, updateWithDelta } from "../../../workSlice";
import store from "../../../../store.js";

ShareDB.types.register(richText.type);

class Document {
  constructor(url, collection, documentId) {
    this.url = url;
    this.collection = collection;
    this.documentId = documentId;
    this.socket = this.createSocket();
    this.connection = new ShareDB.Connection(this.socket);
    this.document = this.fetchDocumentInstance();
    // this.subscribe();

    this.observer = null;
  }
  createSocket() {
    return new ReconnectingWebSocket("ws://" + this.url);
  }
  fetchDocumentInstance() {
    return this.connection.get(this.collection, this.documentId);
  }
  attach(observer) {
    if (this.observer) {
      throw new Error("Observer already exists!");
    } else {
      this.observer = observer;
    }
  }
  detach() {
    this.observer = null;
  }
  notify(change) {
    if (this.observer) {
      this.observer(change);
    }
  }
  submitChange(delta) {
    console.log("Submitting delta.");
    this.document.submitOp(delta, { source: "quill" });
  }
  subscribe() {
    const onLoad = () => {
      store.dispatch(updateHtml({ editor: this.document.data }));
      this.notify(this.document.data);
    };
    const onSubscribe = () => {
      console.log("Subscribed to document instance.");
    };
    const onOperation = (op, source) => {
      if (source == "quill") {
        return;
      } else {
        console.log("Operation received from: " + source + ".");
        this.notify(op);
      }
    };
    this.document.subscribe(onSubscribe);
    this.document.on("load", onLoad);
    this.document.on("op", onOperation);
  }
}

const doc = new Document("55.55.55.5:8080", "examples", "richtext");
doc.subscribe();
// console.log(doc.document);

export default doc;
// export { onDisconnect, onConnect, submitChange };
