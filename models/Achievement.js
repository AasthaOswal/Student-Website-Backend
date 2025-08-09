const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
    stuID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true
    },

    title : String , 
    description : String , 
    date : Date , 
    certificateURL : String , 
} , 
{timestamps : true});


module.exports = mongoose.model("Achievemet" , achievementSchema);