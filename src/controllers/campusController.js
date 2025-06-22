const activities = require('./admincampusController').activities;

exports.getMap = (req, res) => {
  res.render('user/campus/index', { activities });
};