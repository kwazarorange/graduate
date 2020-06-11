var ShareDB = require("sharedb");
var richText = require("./rich-text");
var WebSocket = require("ws");
var WebSocketJSONStream = require("@teamwork/websocket-json-stream");

ShareDB.types.register(richText.type);

const database = require('sharedb-mongo')('mongodb://127.0.0.1:27017/collabdb')
var backend = new ShareDB({ db: database ,presence: true });


function connectShareDBtoServer(server) {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", function(ws) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
}
module.exports = connectShareDBtoServer;
