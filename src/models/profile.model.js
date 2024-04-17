const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({

    college: {
        type: String,
    },
    location: {
        type: String,
    },
    maxStreak: {
        type: Number,
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    about: {
        type: String,
    },
    languages: [
        {
            type: String,
        }
    ],
    streak:{
        type:Number,
        default:0
    },
    rank:{
        type:Number,
        default:0
    },
    points:{
        type:Number,
        default:0
    },

})

module.exports = mongoose.model("Profile", profileSchema);
