const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,

    },fullName:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true
    },
    password: {
        type: String,
        required: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    profileImage:{
        type:String,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    verifyUUID:{
        type:String,
    },
    verifyUUIDExpiry:{
        type:Date,
    }
})

module.exports = mongoose.model("User", userSchema);