const Delta = require("quill-delta");

const deltaFromJson = (json) => {
  return new Delta(JSON.parse(json));
}

module.exports = deltaFromJson;
