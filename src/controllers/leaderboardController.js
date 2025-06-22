const { User } = require('../models'); // Impor model User

exports.showLeaderboard = async (req, res) => {
  try {
    // Ambil semua user dari database, urutkan berdasarkan total_poin
    const leaderboard = await User.findAll({
      order: [['total_poin', 'DESC']],
      attributes: ['nama', 'total_poin'] // Ambil hanya nama dan total_poin
    });

    // Ubah nama field agar sesuai dengan view (jika perlu) atau biarkan
    const formattedLeaderboard = leaderboard.map(user => ({
      username: user.nama,
      points: user.total_poin
    }));
    
    // Asumsi user yang login datanya ada di req.user
    const currentUser = req.user ? await User.findByPk(req.user.id) : null;
    const username = currentUser ? currentUser.nama : 'Guest';
    const userPoints = currentUser ? currentUser.total_poin : 0;

    res.render('leaderboard', {
      username,
      userPoints,
      leaderboard: formattedLeaderboard
    });
  } catch (error) {
    console.error("Gagal memuat leaderboard:", error);
    res.status(500).send("Terjadi kesalahan pada server");
  }
};
