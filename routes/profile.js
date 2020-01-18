var express = require('express');
var router = express.Router();
var connect = require('connect-ensure-login');
var profile_controller = require('../controllers/profile_controller');
var secured = require('../controllers/modules/utils/secured');

router.get('/', secured(), profile_controller.fetch);
router.post('/',secured(),  profile_controller.update);
router.get('/start', secured(), (req, res, next) => res.render('start'));
router.get('/last', secured(), (req, res, next) => res.render('last'));

module.exports = router;
