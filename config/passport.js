var passport = require('passport');
var mongoose = require('mongoose');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function() {

    var Usuario  = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '',
        clientSecret: '',
        callbackURL: ''
    }, function(accessToken, refreshToken, profile, done) {
        
        Usuario.findOrCreate(
            { 
                "login": profile.username 
            },
            { 
                "nome": profile.username 
            },
            function(error, user) {
                if(error) {
                    console.log(error);
                    return done(error);
                }
                return done(null, user)
            }
        );

    }));
}