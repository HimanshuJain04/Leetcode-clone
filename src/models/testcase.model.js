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


module.exports = mongoose.model("Testcase" , testcaseSchema);


export default model("Testcase" , testcaseSchema);

