var passport = require('passport');
var mongoose = require('mongoose');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function() {

    var Usuario  = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '064407fcc44727bfd9ea',
        clientSecret: 'f028dab9795eadb5db2e897e8b681e4f9db104e7',
        callbackURL: 'http://localhost:3000/auth/github/callback'
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


    /*
        Chamado apenas UMA vez e recebe o usuário do nosso
        banco disponibilizado pelo callback da estratégia de
        autenticação. Realizará a serialização apenas do
        ObjectId do usuário na sessão.
    */
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });


    /*
        Recebe o ObjectId do usuário armazenado na sessão.
        Chamado a CADA requisição.
    */
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
            .then(function(user) {
                done(null, user);
            });
    });
}