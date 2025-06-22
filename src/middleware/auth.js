const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Akses ditolak. Anda tidak memiliki izin admin.');
    }
    
    next();
};

const optionalAuth = (req, res, next) => {
    // This middleware makes authentication optional
    // It just passes through, but you can access req.session.user if it exists
    next();
};

module.exports = {
    requireAuth,
    requireAdmin,
    optionalAuth
}; 