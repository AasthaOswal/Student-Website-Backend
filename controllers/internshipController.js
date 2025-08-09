const Internship = require("../models/Internship");
const Student = require("../models/student");

exports.createInternship = async (req, res) => {
    try {
        const { companyName, role, duration, certificateURL, description } = req.body;

        
        const stuID = req.user.id; 


        const studentExists = await Student.findById(stuID);
        if (!studentExists) {
            return res.status(404).json({ message: "Student not found" });
        }

        const internship = new Internship({
            stuID,
            companyName,
            role,
            duration,
            certificateURL,
            description
        });

        await internship.save();

        res.status(201).json({
            message: "Internship created successfully",
        });
    } catch (error) {
        console.error("Create Internship Error:", error);
        res.status(500).json({ message: "Server error while creating internship" });
    }
};