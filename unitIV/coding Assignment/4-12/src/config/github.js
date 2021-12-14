const GitHubStrategy = require('passport-github').Strategy;

const passport = require('passport')

require('dotenv').config();
console.log( process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET)


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:1234/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
 console.log("1",accessToken, "2",refreshToken, "3",profile)
      console.log("hello")
      // return cb(null, user);

  }
));

module.exports = passport;