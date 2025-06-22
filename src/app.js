const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');

// Route Imports
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require('./routes/dashboardRoutes');
const jadwalRoutes = require('./routes/jadwalRoutes');
const adminRoutes = require('./routes/adminRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

// Settings
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Use path relative to 'views' folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session middleware
app.use(session({
    secret: 'bakti-maba-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware untuk mengatur layout berdasarkan route
app.use((req, res, next) => {
    if (req.path.startsWith('/admin')) {
        res.locals.layout = 'layouts/admin';
        res.locals.isAdmin = true;
    } else {
        res.locals.layout = 'layouts/main';
        res.locals.isAdmin = false;
    }
    
    // Make user data available to all views
    res.locals.user = req.session.user;
    next();
});

// Middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Routes - Admin routes first to avoid conflicts
app.use('/admin', adminRoutes);
app.use("/login", authRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/galeri', galleryRoutes);
app.use("/", dashboardRoutes);

// Default route redirect to dashboard for now
app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
