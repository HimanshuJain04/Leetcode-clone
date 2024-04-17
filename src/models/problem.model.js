const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    questionType:{
        type:String,
        enum:["Easy", "Medium", "Hard"],
        required:true,
    },
    topics:[
        {
            type:String,
        }
    ],
    companies:[
        {
            type:String,
        }
    ]
    
})

module.exports = mongoose.model("Problem", problemSchema)