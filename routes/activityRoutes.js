const express = require("express");
const router = express.Router();
const { createActivity } = require("../controllers/activityController");
const { authenticateToken } = require("../middlewares/authMiddleware");


// Create new activity
router.post("/", authenticateToken, createActivity);

module.exports = router;
