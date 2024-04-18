import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,

    },fullName:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    additionalDetails: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    profileImage:{
        type:String,
    },
    token:{
        type:String,
    },
    tokenExpiry:{
        type:Date,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    solvedProblem:[
        {
            problemId:{
                type: Schema.Types.ObjectId,
                ref:"Problem",
            },
            submissionCount:{
                type: Number,
                default:0
            },
            submittedAt:{
                type:Date,
            }
        }
    ],
    like:[
        {
            type:Schema.Types.ObjectId,
            ref:"Problem"
        }
    ],
    bookmark:[
        {
            type:Schema.Types.ObjectId,
            ref:"Problem"
        }
    ]
})

export default model("User", userSchema);


