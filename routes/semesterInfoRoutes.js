const express = require("express");
const router = express.Router();
const { createSemesterInfo } = require("../controllers/semesterInfoController");
const {authenticateToken} = require("../middlewares/authMiddleware");

router.post("/", authenticateToken, createSemesterInfo);

module.exports = router;
