const viewLoginPage = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    });
};

module.exports = {
    viewLoginPage
};