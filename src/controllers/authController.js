const viewLoginPage = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        layout: false
    });
};

module.exports = {
    viewLoginPage
};