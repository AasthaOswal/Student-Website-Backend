const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", require("./routes/authRoutes"));

// Root route
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
