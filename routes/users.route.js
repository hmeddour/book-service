const controller = require('../controllers/user.controller');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


router
  .route('/signup')
  .post(controller.addOne)

router 
  .route('/login')
  .post(controller.getOne)  


/*  

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          return res.render('register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/');
      });
  });
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");

});*/

module.exports = router;
