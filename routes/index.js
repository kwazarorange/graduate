var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/postDelta', (req, res) => {
  console.log("Delta posted: ");
  console.log(req.body.delta);
})

module.exports = router;
