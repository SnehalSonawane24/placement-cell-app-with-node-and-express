const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});


// check if the user is authenticated
passport.checkAuthentication = function(request, respond, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(request.isAuthenticated()){
        return next();
    }
// _________aurhentication using Passport________

// if the user is not signed in 
return respond.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(request,respond, next){
if(request.isAuthenticated()){
    // request.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    respond.locals.user = request.user;
}
next();
}


module.exports = passport;