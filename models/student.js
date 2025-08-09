const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    stuID : {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        unique: true
    },
    email :{
        type : String,
        required : true , 
        unique : true
    } ,  
    password : {
        type : String,
        required : true , 
    } ,  

    name : String , 
    rollno : String , 
    year : String , 
    div : String , 
    branch : String ,
    dob : Date , 
    bloodGroup :String , 
    fees : Number , 
    caste : String , 
    
} , 
{timestamps : true});

module.exports = mongoose.model("student" , studentSchema);
