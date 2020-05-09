import ReconnectingWebSocket from "reconnecting-websocket";
import ShareDB from "sharedb/lib/client";
import richText from "./rich-text";
import { v4 as uuidv4 } from 'uuid';

ShareDB.types.register(richText.type);

const PRESENCE_CHANGE = "presence";
const DOCUMENT_CHANGE = "document";


class Document {
  constructor(url, collection, documentId, presenceId) {
    this.url = url;
    this.collection = collection;
    this.documentId = documentId;
    this.socket = this.createSocket();
    this.connection = new ShareDB.Connection(this.socket);
    this.presenceId = presenceId
  }
  createSocket() {
    return new ReconnectingWebSocket("ws://" + this.url);
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
    console.log("Submitting delta.");
    this.document.submitOp(delta, { source: "quill" });
  }
  submitPresence(range) {
    console.log("Submitting presence: ", range)
    this.localPresence.submit(range, error => {
      if (error) throw error;
    })
  }
  destroyPresence() {
    // console.log("Destroying local presence");
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
      console.log("Subscribed to document instance.");
    };
    const onOperation = (op, source) => {
      if (source == "quill") {
        return;
      } else {
        console.log("Operation received from: " + source + ".");
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
      console.log("Subscribed to document presence.");
    };
    this.presence.subscribe(onSubscribe);
    this.presence.on("receive", (id, range) => {
      // console.log(this.presence);
      this.notify(PRESENCE_CHANGE, {id, range})
    })
  };
}

export default Document;
export {PRESENCE_CHANGE, DOCUMENT_CHANGE}
