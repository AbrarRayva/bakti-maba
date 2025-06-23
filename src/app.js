const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const multer = require('multer'); // For file uploads
const fs = require('fs'); // For ensuring upload directories exist
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// Database connection
const db = require('./models');

// Route Imports
const authRoutes = require("./routes/authRoutes");
const adminAssignmentRoutes = require('./routes/adminassignmentRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const adminCampusRoutes = require('./routes/admincampusRoutes');
const campusRoutes = require('./routes/campusRoutes');
const materialRoutes = require('./routes/materialRoutes');
const adminMaterialRoutes = require('./routes/adminMaterialRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const jadwalRoutes = require('./routes/jadwalRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Settings
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Use path relative to 'views' folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware untuk mengatur layout berdasarkan route
app.use((req, res, next) => {
    if (req.path.startsWith('/admin')) {
        res.locals.layout = 'layouts/admin';
        res.locals.isAdmin = true;
    } else {
        res.locals.layout = 'layouts/main';
        res.locals.isAdmin = false;
    }
    next();
});

// Middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

// Session middleware
app.use(session({
    secret: 'b4kt1-m4b4-s3cr3t-k3y-d4n-kawan-kawan', // Use a long, random string
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
const submissionDir = path.join(uploadDir, 'submissions');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(submissionDir)) {
    fs.mkdirSync(submissionDir, { recursive: true });
}

// Routes - Admin routes first to avoid conflicts
app.use('/admin', adminRoutes);
app.use("/login", authRoutes);
app.use('/jadwal', jadwalRoutes);
app.use("/", dashboardRoutes);

// Assignment and campus routes
app.use('/admin', adminAssignmentRoutes);
app.use('/', assignmentRoutes);
app.use('/admin', adminCampusRoutes);
app.use('/', campusRoutes);
app.use('/material', materialRoutes);
app.use('/admin/material', adminMaterialRoutes);

// Default route redirect to dashboard for now
app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

// Database sync and server start
const PORT = process.env.PORT || 3000;

// Sync database and start server
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log('Database connected successfully');
        });
    })
    .catch((error) => {
        console.error('Database sync failed:', error);
    });
