var update_profile = require('./modules/profile/update');
var fetch_profile = require('./modules/profile/fetch');
var data_point_factory = require('./modules/utils/data_point_factory');

module.exports.fetch = (req, res, next) => {
    fetch_profile({
        data_point: req.query.point,
        profile_id: req.query.profile_id ?  req.query.profile_id: 0,
        farmer_id: req.session.passport.user.id
    })
    .then(results => res.render(req.query.point, results))
    .catch(message => res.render("error", message));

};

module.exports.update = (req, res, next) => {
    update_profile({
        profile_id: req.body.profile_id,
        data_point: req.body.point,//current
        data: data_point_factory.parse_body(req.body.point, req.body),
        date: req.body.date
    })
    .then(result => res.redirect('/profile?point='+data_point_factory.next_url(req.body.point) +'&profile_id='+req.body.profile_id))
    .catch(error => {
        console.log(error);
        res.render("error", {message: "Something went wrong updating your profile. Try again."});
    });
};
