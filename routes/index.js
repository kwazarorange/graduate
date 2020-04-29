const deltaFromJson = require("../sharedb/delta");
var express = require("express");
var router = express.Router();

var deltaDb = false;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/postDelta', (req, res) => {
  console.log("Delta posted");
  const delta = deltaFromJson(req.body.delta);
  if (deltaDb) {
    deltaDb = deltaDb.compose(delta);
  } else {
    deltaDb = delta;
  };

  res.send("got it!");
})

module.exports = router;
