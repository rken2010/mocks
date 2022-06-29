function auth( req, res,next) {
    if (req.session?.user && req.session.user?.admin) {
        return next();
    } else {
        res.redirect('/login-error');
    }
}   

export default auth;