var express = require('express');
var secured = require('../controllers/modules/utils/secured');
var update = require('../controllers/modules/account/update');
var fetch_profile = require('../controllers/modules/account/fetch');

var router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;

  fetch_profile({farmer_id: req.session.passport.user.id})
  .then(result => res.render('account', result))
  .catch(error => {
      console.log(error);
      res.render('error', {message: 'Something went wrong loading your profile. Try again.'})
  });
});

router.post('/user/update',secured(), (req, res, next) => {
        update({
            ID: req.session.passport.user.id,
            email_address: req.body.email_address,
            fullname: req.body.fullname,
            phone_number: req.body.phone_number
        })
        .then(result => res.redirect('/'))
        .catch(error => res.render('account', error));
} );


module.exports = router;
