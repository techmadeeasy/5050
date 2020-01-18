var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var connect = require('connect-ensure-login');
var indexRouter = require('./routes/index');
var profile_router = require('./routes/profile');
var morgan_body = require('morgan-body');
var promise_query = require('./controllers/modules/utils/promise_connection');
var mysqlstore = require('express-mysql-session');
var session = require('express-session');
var cryptojs = require('crypto-js');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var store_profile = require('./controllers/modules/account/store_profile');
var user_in_views = require('./controllers/modules/utils/user_in_views');
var index_router = require("./routes/index");
var auth_router = require('./routes/auth');
var user_router = require('./routes/user');
var app = express();
require('dotenv').config({ path: require('app-root-path') + '/.env' });


var options = {
    // host: env('localhost'),
    // port: 3306,
    // user: 'root',
    // password: 'vckVCK1995',
    // database: '5050_farmers_db',
  // Whether or not to automatically check for and clear expired sessions:
  clearExpired: true,
  // How frequently expired sessions will be cleared; milliseconds:
  checkExpirationInterval: 900000,
  // The maximum age of a valid session; milliseconds:
  expiration: 86400000,
  // Whether or not to create the sessions database table, if one does not already exist:
  // Number of connections when creating a connection pool:
  connectionLimit: 1,
  // Whether or not to end the database connection when the store is closed.
  // The default value of this option depends on whether or not a connection was passed to the constructor.
  // If a connection object is passed to the constructor, the default value for this option is false.
  endConnectionOnClose: true
};



var sessionStore = new mysqlstore(options);
//set resave to true for use with mysql store b/c it does not implement touch method(session renewal)

app.use(session({
    key: 'mts_key',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));

// view engine setup
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser(function(user, done) {
    promise_query('select ID from Farmer where email_address = ? ', [user._json.email])
    .then(result => {

        if(result.length > 0){
            user.id = result[0].ID;
            return done(null, user);
        }
        //if empty, call store_profile then serialize

        store_profile({user: user})
        .then(result => {
            user.id = result.farmer_id;
            return done(null, user);
        })
        .catch(error => done(null, false, {message: error.message}));

    })
    .catch(error => done(null, false, {message: error.message}));
});

passport.deserializeUser(function(user, cb) {

    cb(null, user);

});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
morgan_body(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(user_in_views);
app.use('/', indexRouter);
app.use('/', auth_router);
app.use('/', user_router);
app.use('/profile', profile_router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
 // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',  {message: err.message});
});

module.exports = app;
