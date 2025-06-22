const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');

// Route Imports
const authRoutes = require("./routes/authRoutes");
const leaderboardRouter = require('./routes/leaderboardRoutes');
const forumRouter = require('./routes/forum');
const chatbotRouter = require('./routes/chatbot');

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/login", authRoutes);
app.use('/leaderboard', leaderboardRouter);
app.use('/forum', forumRouter);
app.use('/chatbot', chatbotRouter);

// Default route redirect to login
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
