const { User } = require('../models');
const bcrypt = require('bcrypt');

const viewLoginPage = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        layout: false
    });
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by NIM (username from form)
        const user = await User.findOne({ 
            attributes: ['nim', 'nama', 'password', 'role'],
            where: { nim: username }
        });
        
        if (!user) {
            return res.render('auth/login', {
                pageTitle: 'Login',
                layout: false,
                error: 'NIM atau password salah'
            });
        }
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.render('auth/login', {
                pageTitle: 'Login',
                layout: false,
                error: 'NIM atau password salah'
            });
        }
        
        // Set session
        req.session.user = {
            nim: user.nim,
            nama: user.nama,
            role: user.role
        };
        
        // Redirect based on role
        if (user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/dashboard');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        res.render('auth/login', {
            pageTitle: 'Login',
            layout: false,
            error: 'Terjadi kesalahan saat login'
        });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/login');
    });
};

module.exports = {
    viewLoginPage,
    login,
    logout
};