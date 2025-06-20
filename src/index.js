const express = require('express');
const app = express();
const path = require('path');

// Route Imports
// const authRoutes = require('./routes/authRoutes');

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// app.use('/login', authRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});