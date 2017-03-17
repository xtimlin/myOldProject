var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createzone', function(req, res, next) {
  res.render('createzone', { title: 'null' });
});

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', { title: 'null' });
});

module.exports = router;
