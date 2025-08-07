const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    basicDetails: {
        name: {
        type: String,
        required: true,
        },
        studentID: {
        type: String,
        required: true,
        unique: true,
        },
        rollNo: {
        type: String,
        required: true,
        },
        year: {
        type: String,
        enum: ['FE', 'SE', 'TE', 'BE'],
        required: true,
        },
        division: {
        type: String,
        required: true,
        },
        branch: {
        type: String,
        required: true,
        },
        dob: {
        type: Date,
        required: true,
        },
        bloodGroup: {
        type: String,
        required: true,
        },
        address: {
        type: String,
        required: true,
        },
        fees: {
        type: Number,
        required: true,
        },
        caste: {
        type: String,
        required: true,
        },
    },

    internships: [
        {
        company: { type: String, required: true },
        role: { type: String, required: true },
        duration: String,
        description: String,
        certificateLink: String,
        }
    ],

    achievements: [
        {
        title: { type: String, required: true },
        description: String,
        date: Date,
        certificateLink: String,
        }
    ],

    activities: [
        {
        type: {
            type: String,
            enum: ['Committee', 'Sport', 'Hackathon', 'Open-Source', 'Competitive-Coding' ,'Other'],
            required: true,
        },
        name: String,
        position: String,
        description: String,
        certificateLink: String,
        }
        ],
}, {timestamps: true,});



module.exports = mongoose.model('Student', studentSchema);
