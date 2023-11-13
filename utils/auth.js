// Middleware to check if the user is authenticated
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // Proceed if authenticated
    }
    res.redirect('/login'); // Redirect to login if not authenticated
};
