const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require('express-ejs-layouts');

// Route Imports
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require('./routes/dashboardRoutes');

// Settings
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Use path relative to 'views' folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/login", authRoutes); // Assuming /login is in authRoutes
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
