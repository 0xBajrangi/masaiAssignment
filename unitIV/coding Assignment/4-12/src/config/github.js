const GitHubStrategy = require('passport-github').Strategy;

const User = require("../models/user.model")

const passport = require('passport')
const {newToken} = require("../controller/user.controller")

require('dotenv').config();
console.log( process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET)

passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:1234/auth/github/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
 console.log("1",accessToken, "2",refreshToken, "3",profile)
   const user = await User.findOne({ name: profile?.displayName }).lean().exec();
   
   if (!user) {
     user = await User.create({
       name:profile?.displayName,
       email: profile?.profileUrl,
       password: "secret",
       roles:["customer"]
     })
   }
   let token = newToken(user)
   return cb(null, { user, token })

  }
));

module.exports = passport;