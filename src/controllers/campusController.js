const activities = require('./admincampusController').activities;

exports.getMap = (req, res) => {
  res.render('campus/index', { activities });
};