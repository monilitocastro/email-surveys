const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id); 
});
passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) =>{
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.GoogleClientID,
    clientSecret: keys.GoogleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({subject: profile.id}, (err, user)=>{
        if(err){
            done(err);
        }
        if(user){
            done(null, user);
        }else{
            new User({subject: profile.id}).save()
            .then(newUser=>done(null, newUser));
        }
    })
  }
));