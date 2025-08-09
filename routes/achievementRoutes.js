const express = require("express");
const router = express.Router();
const { createAchievement } = require("../controllers/achievementController");
const {authenticateToken} = require("../middlewares/authMiddleware");

// Create achievement
router.post("/", authenticateToken, createAchievement);

module.exports = router;
