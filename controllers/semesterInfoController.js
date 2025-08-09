const SemesterInfo = require("../models/SemesterInfo");
const Student = require("../models/student");

exports.createSemesterInfo = async (req, res) => {
    try {
        const { semester, attendance, kts, marks, isDefaulter } = req.body;

        const stuID = req.user.id;

        const studentExists = await Student.findById(stuID);
        if (!studentExists) {
            return res.status(404).json({ message: "Student not found" });
        }

        const semesterInfo = new SemesterInfo({
            stuID,
            semester,
            attendance,
            kts,
            marks,
            isDefaulter
        });

        await semesterInfo.save();

        res.status(201).json({
            message: "Semester info created successfully",
        });
    } catch (error) {
        console.error("Create SemesterInfo Error:", error);
        res.status(500).json({ message: "Server error while creating semester info" });
    }
};
