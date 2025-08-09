const express = require("express");
const router = express.Router();
const { createInternship } = require("../controllers/internshipController");
const {authenticateToken} = require("../middlewares/authMiddleware");


router.post("/", authenticateToken, createInternship);

module.exports = router;
