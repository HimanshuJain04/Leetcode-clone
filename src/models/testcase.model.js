const mongoose = require("mongoose");

const testcaseSchema = new mongoose.Schema({
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Problem"
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

module.exports = mongoose.model("Testcase" , testcaseSchema);


