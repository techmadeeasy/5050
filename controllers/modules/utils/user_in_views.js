
module.exports = (req, res, next) => {
    res.locals['user'] = req.user;
    return next();
};
