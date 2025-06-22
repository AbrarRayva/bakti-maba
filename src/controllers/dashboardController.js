const dashboardController = {
    index: (req, res) => {
        res.render('dashboard/dashboard', {
            title: 'Dashboard'
        });
    }
};

module.exports = dashboardController; 