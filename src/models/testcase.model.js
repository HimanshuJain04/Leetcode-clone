import { Schema, model } from "mongoose";

const testcaseSchema = new Schema({
    questionId:{
        type:Schema.Types.ObjectId,
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

export default model("Testcase" , testcaseSchema);