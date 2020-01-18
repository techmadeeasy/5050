var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('util');
var url = require('url');
var querystring = require('querystring');
var store_profile = require('../controllers/modules/account/store_profile');

require('dotenv').config({ path: require('app-root-path') + '/.env' });


// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err); }

    if (!user) { return res.redirect('/login'); }

    req.logIn(user, function (err) {

          if (err) { return next(err); }
          const returnTo = req.session.returnTo;
          delete req.session.returnTo;

          store_profile({user: user})
          .then(result => {
              return res.redirect(returnTo || '/');
          })
          .catch(error => res.render('error', {message: error.message}));
    });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();

  var returnTo = "https://5050farmers.com";
  var logoutURL = new url.URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  );
  var searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: process.env.AUTH0_LOGOUT_URL
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});

module.exports = router;
