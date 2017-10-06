var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var app = express();
var bodyParser =require('body-parser');

app.use(bodyParser.json());


passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

        googleProfile = {
            id: profile.id,
            displayName: profile.displayName,
            familyName: profile.name.familyName,
            givenName: profile.name.givenName,
            emails: profile.emails



        };
        console.log()
        cb(null, profile);
    }
));

app.set('view engine', 'pug');
app.set('views','./views');


app.use(passport.initialize());
app.use(passport.session());


//app route
app.get('/', function (req, res) {
    res.render('index.pug', { user: req.user});
});
app.get('/logged', function (req, res) {
    res.render('logged.pug', {user: googleProfile});
});
// passport route
app.get('/auth/google',
    passport.authenticate('google', {
        scope : ['profile', 'email']
    }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/logged',
        failureRedirect: '/wrong'
    }));


app.listen(3000);
