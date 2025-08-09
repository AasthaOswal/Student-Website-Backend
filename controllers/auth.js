const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey"; 
const JWT_EXPIRES_IN = "1d"; 

// signup
exports.signup = async (req, res) => {
    try {
        const { studentID, email, password, name, rollno, year, div, branch, dob, bloodGroup, fees, caste } = req.body;

        // Check if email already exists
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student
        const newStudent = new Student({
            studentID,
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

        const token = jwt.sign(
            { id: newStudent._id, email: newStudent.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

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

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: "Login successful" });


    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during log2in" });
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
