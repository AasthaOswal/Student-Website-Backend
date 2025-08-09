const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/auth");
const authenticateToken = require("../middleware/authMiddleware");

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

module.exports = router;
