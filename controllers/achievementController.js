const Achievement = require("../models/Achievement");
const Student = require("../models/student");

exports.createAchievement = async (req, res) => {
    try {
        const { title, description, date, certificateURL } = req.body;

        const stuID = req.user.id;

        const studentExists = await Student.findById(stuID);
        if (!studentExists) {
            return res.status(404).json({ message: "Student not found" });
        }

        const achievement = new Achievement({
            stuID,
            title,
            description,
            date,
            certificateURL
        });

        await achievement.save();

        res.status(201).json({
            message: "Achievement created successfully"
        });
    } catch (error) {
        console.error("Create Achievement Error:", error);
        res.status(500).json({ message: "Server error while creating achievement" });
    }
};
