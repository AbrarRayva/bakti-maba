const bcrypt = require('bcryptjs');
const db = require('../models');

const viewLoginPage = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        body: `
            <div class="flex justify-center items-center h-screen bg-transparent md:bg-indigo-100">
                <div class="px-14 py-20 max-w-full bg-white rounded-2xl sm:max-w-4/5 shadow-lg">
                    <div class="flex flex-col space-y-4">
                        <h1 class="text-xl font-bold tracking-tight md:text-2xl">
                            Login
                        </h1>
                        <p class="text-base">
                            Masukkan username (NIM) dan password yang telah diberikan oleh panitia.
                        </p>

                        <form action="/login" method="POST" class="w-full">
                            <div class="w-full">
                                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                                <div class="mt-1 relative">
                                    <input type="text" id="username" name="username" class="block w-full pl-8 pr-3 py-2 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-indigo-100" placeholder="251152xxxx" required />
                                    <span class="absolute inset-y-0 left-2 flex items-center text-gray-700">@</span>
                                </div>
                            </div>

                            <div class="w-full mt-4">
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <div class="mt-1 relative">
                                    <input type="password" id="password" name="password" class="block w-full pl-8 pr-3 py-2 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-indigo-100" placeholder="Password" required />
                                    <span class="absolute inset-y-0 left-2 flex items-center text-gray-700">#</span>
                                </div>
                            </div>

                            <button type="submit" class="block w-full px-8 py-2 bg-indigo-500 border border-indigo-300 rounded-2xl text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-indigo-600 transition-colors duration-200 mt-6">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `
    });
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await db.User.findOne({
            where: { username: username }
        });

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Username atau password salah' 
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false, 
                message: 'Username atau password salah' 
            });
        }

        // Set session
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.role = user.role;

        // Redirect based on role
        if (user.role === 'admin') {
            res.redirect('/admin/assignment');
        } else {
            res.redirect('/assignment');
        }

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan server' 
        });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Gagal logout' 
            });
        }
        res.redirect('/login');
    });
};

module.exports = {
    viewLoginPage,
    login,
    logout
};