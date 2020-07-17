import ReconnectingWebSocket from "reconnecting-websocket";
import ShareDB from "sharedb/lib/client";
import richText from "./rich-text";

ShareDB.types.register(richText.type);

const PRESENCE_CHANGE = "presence";
const DOCUMENT_CHANGE = "document";


class Document {
  constructor(url, collection, documentId, presenceId, presenceName) {
    this.url = url;
    this.collection = collection;
    this.documentId = documentId;
    this.presenceName = presenceName;
    this.socket = this.createSocket();
    this.connection = new ShareDB.Connection(this.socket);
    this.presenceId = presenceId
  }
  createSocket() {
    return new ReconnectingWebSocket("wss://" + this.url);
  }
  fetchDocumentInstance() {
    const document = this.connection.get(this.collection, this.documentId);
    if (document.type == null) {
      document.create([{ insert: "" }], "rich-text");
    }
    return document;
  }
  fetchPresence() {
    const presence = this.document.connection.getDocPresence(this.collection, this.documentId);
    const localPresence = presence.create(this.presenceId)
    return [presence, localPresence]
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
  notify(type, change) {
    if (this.observer) {
      this.observer(type, change);
    }
  }
  submitChange(delta) {
    this.document.submitOp(delta, { source: "quill" });
  }
  submitPresence(range) {
    this.localPresence.submit(range, error => {
      if (error) throw error;
    })
  }
  destroyPresence() {
    this.localPresence.destroy(error => {
      if (error) throw error;
    })
  }
  subscribe() {
    this.document = this.fetchDocumentInstance();
    [this.presence, this.localPresence] = this.fetchPresence();
    this.observer = null;

    const onLoad = () => {
      this.notify(DOCUMENT_CHANGE, this.document.data);
    };
    const onSubscribe = (error) => {
      if (error) throw error;
    };
    const onOperation = (op, source) => {
      if (source === "quill") {
        return;
      } else {
        this.notify(DOCUMENT_CHANGE, op);
      }
    };
    this.document.subscribe(onSubscribe);
    this.document.on("load", onLoad);
    this.document.on("op", onOperation);
    this.subscribeToPresence();

  }
  subscribeToPresence() {
    const onSubscribe = (error) => {
      if (error) throw error;
      this.submitPresence({name: this.presenceName, index: 0, length: 0});
    };
    this.presence.subscribe(onSubscribe);
    this.presence.on("receive", (id, range) => {
      this.notify(PRESENCE_CHANGE, {id, range})
    })
  };
}

export default Document;
export {PRESENCE_CHANGE, DOCUMENT_CHANGE}
