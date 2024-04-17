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
    ]

})

module.exports = mongoose.model("Profile", profileSchema);
