import { Schema, model } from "mongoose";

const profileSchema = new Schema({

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

export default model("Profile", profileSchema);
