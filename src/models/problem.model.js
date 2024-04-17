const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    id:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    questionType: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },
    title:{
        type:String,
        required:true
    },
    topics:[
        {
            type: String,
        }
    ],
    companies: [
        {
            type: String,
        }
    ],
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    bookmarks:{
        type:Number,
        default:0
    }
    
})