var express = require('express');
var router = express.Router();
const  fs = require('fs');
/* GET home page. */
router.get('/', async function(req, res, next) {
  let s = fs.readFile("./public/index.html") + "";
  res.send(s);
});

module.exports = router;
