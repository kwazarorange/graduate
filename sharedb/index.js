var ShareDB = require("sharedb");
var richText = require("rich-text");
var WebSocket = require("ws");
var WebSocketJSONStream = require("@teamwork/websocket-json-stream");

ShareDB.types.register(richText.type);

var backend = new ShareDB();

const createDocument = () => {
  var connection = backend.connect();
  var doc = connection.get("examples", "richtext");
  doc.fetch(err => {
    if (err) throw err;
    if (doc.type == null) {
      doc.create(
        [
          { insert: ""}
        ],
        "rich-text"
      );
    }
  });
};

const connectShareDBtoServer = server => {
  createDocument();

  var wss = new WebSocket.Server({ server });
  wss.on("connection", ws => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
};

module.exports = connectShareDBtoServer;
