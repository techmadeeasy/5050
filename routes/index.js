var express = require("express");
var promise_query = require("../controllers/modules/utils/promise_connection");
var secured = require("../controllers/modules/utils/secured");
var fetch_profile = require("../controllers/modules/farms/fetch");
var fetch_farm = require("../controllers/modules/account/fetch");
var fetch_weather = require("../controllers/modules/weather/fetch");

var router = express.Router();

/* GET home page. */
router.get("/", secured(), (req, res, next) => res.render("home"));

router.get("/help_center", secured(), (req, res, next) => {
  promise_query("select email_address,fullname from Farmer where ID = ? ", [
    req.session.passport.user.id
  ])
    .then(user => res.render("help_center", { user: user[0] }))
    .catch(error => res.render("error", { message: error.message }));
});

router.get("/farms", (req, res, next) => {

  //manually setting the agent id here for now..you may have to figure out how
  //to identify a user as an agent when logging in..not sure how that will work LOL
  fetch_profile({ farmer_id: req.session.passport.user.id })
    .then(results => {
      res.render("farms", { farms: results });
    })
    .catch(err => {
      res.render("error", {
        message: "Could not retrieve farm profiles. Try again."
      });
    });
});

router.get("/farms/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  fetch_farm({ farm_id: id, farmer_id: req.session.passport.user.id })
    .then(results => {
      res.render("farm", results);
    })
    .catch(err => {
      res.render("error", {
        message: "Could not retrieve farm information. Try again."
      });
    });
});

router.get("/weather", (req, res, next) => {
  const search = req.query.search;
  let default_search = "Gaborone";

  fetch_weather({ search: search ? search : default_search })
    .then(results => {
      res.render("weather", {
        latitude: results.Latitude,
        longitude: results.Longitude,
        title: search ? search : default_search
      });
    })
    .catch(err => {
      res.render("error", {
        message: "Failed to load the weather forecast. Try again."
      });
    });
});


router.get('/terms', (req, res, next) => {
  res.render('TnCs');
})


module.exports = router;
