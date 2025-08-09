const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    stuID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true
    },

    companyName : String , 
    role : String , 
    duration : String ,
    certificateURL : String , 
    description : String , 
} , 
{timestamps: true});

module.exports = mongoose.model("Internship" , internshipSchema);