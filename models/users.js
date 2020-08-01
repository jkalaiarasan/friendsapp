const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    UserName : {
        type : String,
        required : true 
    },
    Department : {
        type : String,
        required : false 
    },
    First_Name : {
        type : String,
        required : false
    },
    Last_Name : {
        type : String,
        required : false
    },
    Phone : {
        type : String,
        required : false
    },
    Password : {
        type : String,
        required : true
    },
    DOB : {
        type : Date,
        required : false
    },
    Email : {
        type: String,
        required :false
    }
})

const user = module.exports = mongoose.model('user', UserSchema);