import mongoose, { Schema, model } from "mongoose";

const problemSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },
    topics: [
        {
            type: String,
        }
    ],
    companies: [
        {
            type: String,
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    dislikes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    bookmarks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    acceptedCount:{
        type:Number,
        default:0
    },
    submissionCount:{
        type:Number,
        default:0
    },
    testCases:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Testcase"
        }
    ],
})

export default model("Problem", problemSchema);