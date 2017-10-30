const express = require('express');
const router = express.Router();
const credentials = require('config').credentials;
const _ = require('lodash');

router.get('/login', handler_login);
router.post('/login', hander_post_login);
router.get('/logout', handler_logout);

function handler_login (req,res){
  return res.render('login.pug');
}

function hander_post_login (req,res){
  const {username, password} = req.body;

  if ( _.has(credentials, username) == false || credentials[username] !== password ) {
    return res.send('Wrong Username or Password');
  }

  req.session.username = username;
  req.session.login = true;

  return res.redirect('/');
}

function handler_logout (req, res){
  req.session.destroy(function(err){
    return res.redirect('/');
  })
}

module.exports = {
  addRouter(app) {
    app.use('/user', router);
  }
};