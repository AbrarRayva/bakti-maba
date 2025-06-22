const express = require("express");
const app = express();
const path = require("path");

// Route Imports
const authRoutes = require("./routes/authRoutes");

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/login", authRoutes);

// Default route redirect to login
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
