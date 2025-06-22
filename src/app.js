const express = require("express");
const app = express();
const path = require("path");
const multer = require('multer'); // For file uploads
const fs = require('fs'); // For ensuring upload directories exist
const session = require('express-session');

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

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
    secret: 'bakti-maba-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
const submissionDir = path.join(uploadDir, 'submissions');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(submissionDir)) {
    fs.mkdirSync(submissionDir, { recursive: true });
}

// Routes
app.use("/login", authRoutes);
app.use('/admin', adminAssignmentRoutes);
app.use('/', assignmentRoutes);
app.use('/admin', adminCampusRoutes);
app.use('/', campusRoutes);
app.use('/material', materialRoutes);
app.use('/admin/material', adminMaterialRoutes);

// Default route
app.get('/', (req, res) => {
    res.redirect('/assignment'); // Or '/login' if you want login as default
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
