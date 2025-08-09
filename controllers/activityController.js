const Activity = require("../models/Activity");
const Student = require("../models/student");

exports.createActivity = async (req, res) => {
    try {
        const { type, title, description, date, certificateURL } = req.body;

        const stuID = req.user.id;

        const studentExists = await Student.findById(stuID);
        if (!studentExists) {
            return res.status(404).json({ message: "Student not found" });
        }

        const activity = new Activity({
            stuID,
            type,
            title,
            description,
            date,
            certificateURL
        });

        await activity.save();

        res.status(201).json({
            message: "Activity created successfully"
        });
    } catch (error) {
        console.error("Create Activity Error:", error);
        res.status(500).json({ message: "Server error while creating activity" });
    }
};
