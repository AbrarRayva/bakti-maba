// Middleware untuk mengecek apakah user sudah login
const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

// Middleware untuk mengecek apakah user adalah admin
const requireAdmin = (req, res, next) => {
    if (req.session && req.session.userId && req.session.role === 'admin') {
        return next();
    }
    res.status(403).render('error', { message: 'Akses ditolak. Anda harus login sebagai admin.' });
};

// Middleware untuk mengecek apakah user adalah mahasiswa
const requireStudent = (req, res, next) => {
    if (req.session && req.session.userId && req.session.role === 'mahasiswa') {
        return next();
    }
    res.status(403).render('error', { message: 'Akses ditolak. Anda harus login sebagai mahasiswa.' });
};

module.exports = {
    requireAuth,
    requireAdmin,
    requireStudent
}; 