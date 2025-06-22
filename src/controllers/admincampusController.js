let activities = [
  { id: 1, title: 'Kegiatan 1',tempat: 'Gedung A 1.8', waktu: '13:30', coords: { x: 150, y: 120 } },
  { id: 2, title: 'Kegiatan 2',tempat: 'Seminar F', waktu: '16:00', coords: { x: 280, y: 160 } }
];

exports.activities = activities;

exports.getMap = (req, res) => {
  res.render('admin/campus/index', { activities }); // Menggunakan path views/admin/campus/index.ejs
};

exports.showForm = (req, res) => {
  const { x, y } = req.query;
  res.render('admin/campus/form', { x: x || '', y: y || '' }); // Menggunakan path views/admin/campus/form.ejs
};

exports.addActivity = (req, res) => {
  const { title, waktu, x, y } = req.body;
  activities.push({ id: Date.now(), title, waktu, coords: { x: Number(x), y: Number(y) } });
  res.redirect('/admin/campus'); // Redirect ke rute /admin/campus
};

exports.deleteActivity = (req, res) => {
  const id = parseInt(req.params.id);
  activities = activities.filter(a => a.id !== id);
  res.redirect('/admin/campus'); // Redirect ke rute /admin/campus
};

exports.showEditForm = (req, res) => {
  const id = parseInt(req.params.id);
  const activity = activities.find(a => a.id === id);
  if (!activity) return res.redirect('/admin2/campus'); // Redirect ke rute /admin/campus
  res.render('admin/campus/edit', { activity }); // Menggunakan path views/admin/campus/edit.ejs
};

exports.updateActivity = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, waktu } = req.body;
  const activity = activities.find(a => a.id === id);
  if (activity) {
    activity.title = title;
    activity.waktu = waktu;
  }
  res.redirect('/admin/campus'); // Redirect ke rute /admin/campus
};