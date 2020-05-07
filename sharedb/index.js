var ShareDB = require("sharedb");
var richText = require("./rich-text");
var WebSocket = require("ws");
var WebSocketJSONStream = require("@teamwork/websocket-json-stream");

ShareDB.types.register(richText.type);

var backend = new ShareDB({ presence: true });

// function createDoc() {
//   var connection = backend.connect();
//   var doc = connection.get("examples", "richtext");
//   doc.fetch(function(err) {
//     if (err) throw err;
//     if (doc.type === null) {
//       doc.create([{ insert: "" }], "rich-text");
//     }
//   });
// }

function connectShareDBtoServer(server) {
  // createDoc();
  const wss = new WebSocket.Server({ server });
  wss.on("connection", function(ws) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
}
module.exports = connectShareDBtoServer;
