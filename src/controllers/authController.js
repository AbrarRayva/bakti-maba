const bcrypt = require('bcryptjs');
const db = require('../models');

const viewLoginPage = (req, res) => {
    // Redirect langsung ke dashboard tanpa login
    res.redirect('/dashboard');
};

const login = async (req, res) => {
    // Redirect langsung ke dashboard tanpa autentikasi
    res.redirect('/dashboard');
};

const logout = (req, res) => {
    // Redirect ke dashboard
    res.redirect('/dashboard');
};

module.exports = {
    viewLoginPage,
    login,
    logout
};