const express = require('express');
const app = express();

const {register,login} = require('./controller/user.controller')

const prodControler = require('./controller/prod.controller');

const passport = require('./config/github');


app.use(express.json());

app.use("/post", prodControler);
app.post("/register", register);
app.post("/login", login);

// github

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = app;
