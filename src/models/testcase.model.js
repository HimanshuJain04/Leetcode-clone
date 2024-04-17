const mongoose = require("mongoose");

const testcaseSchema = new mongoose.Schema({
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Problem"
    },
    id:{
        type:Number,
        required:true
    },
    input:{
        type:String,
        required:true
    },
    output:{
        type:String,
        required:true
    }
})