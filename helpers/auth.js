module.exports.checkAuth = function (req, res, next) {
    const userid = req.session.userid
    console.log(userid)
    if (!userid) {
        res.redirect('/login')
    } else {
        next()
    }
}
