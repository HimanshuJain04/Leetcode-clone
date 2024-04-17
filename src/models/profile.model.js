const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({

    college:{
        type:String,
    },
    location:{
        type:String,
    },
    maxStreak:{
        type:Number,
    },
    
})

module.exports = mongoose.model("Profile", profileSchema);
