const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer'); // Diperlukan untuk upload file
const fs = require('fs'); // Untuk memastikan direktori upload ada

// Import Routes
const adminAssignmentRoutes = require('./routes/adminassignmentRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const adminCampusRoutes = require('./routes/admincampusRoutes'); // Rute untuk admin2 kampus
const campusRoutes = require('./routes/campusRoutes');
const materialRoutes = require('./routes/materialRoutes');
const adminMaterialRoutes = require('./routes/adminmaterialRoutes');

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Untuk melayani file statis seperti CSS, JS, gambar, dan file yang diupload
app.use(express.urlencoded({ extended: true })); // Untuk parsing body dari form HTML (application/x-www-form-urlencoded)
app.use(express.json()); // Untuk parsing body dari JSON (application/json)

// Ensure upload directories exist
const uploadDir = path.join(__dirname, 'public', 'uploads');
const submissionDir = path.join(uploadDir, 'submissions');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(submissionDir)) {
    fs.mkdirSync(submissionDir, { recursive: true });
}


// Routes
app.use('/admin', adminAssignmentRoutes); // Rute untuk admin tugas (misal /admin/assignment)
app.use('/', assignmentRoutes); // Rute untuk tugas mahasiswa (misal /assignment)
app.use('/admin', adminCampusRoutes); // Rute untuk admin2 kampus (misal /admin2/campus)
app.use('/', campusRoutes);
app.use('/material', materialRoutes); // Rute untuk kampus mahasiswa (misal /campus)
app.use('/admin/material', adminMaterialRoutes); // Rute untuk admin2 materi (misal /admin2/material)

// Default route
app.get('/', (req, res) => {
  res.redirect('/assignment'); // Arahkan ke halaman daftar tugas sebagai halaman utama
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});