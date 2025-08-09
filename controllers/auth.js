const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey"; // Store in .env
const JWT_EXPIRES_IN = "1d"; // 1 day

// signup
exports.signup = async (req, res) => {
    try {
        const { stuID, email, password, name, rollno, year, div, branch, dob, bloodGroup, fees, caste } = req.body;

        // Check if email already exists
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student
        const newStudent = new Student({
            stuID,
            email,
            password: hashedPassword,
            name,
            rollno,
            year,
            div,
            branch,
            dob,
            bloodGroup,
            fees,
            caste
        });

        await newStudent.save();

        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error during signup" });
    }
};

// login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: student._id, email: student.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Send token in cookie (HttpOnly for security)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

// logout
exports.logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server error during logout" });
    }
};
