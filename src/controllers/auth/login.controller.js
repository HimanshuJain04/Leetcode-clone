import User from "@/models/user.model";
import { z } from "zod";
import {isEmailAlreadyExist, isUserNameAlreadyExist} from "@/helper/isUserExist";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config()


const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const login = async(req,res) =>{
    try{
        // get data from body
        const body = await req.json();

        // validate request body
        try{
            loginSchema.parse(body);
        } catch(err){
            return res.status(400).json({
                message:"validation error in login",
                success:false,
                error:err
            })
        }

        // fetch data from body
        const {email, password} = body;


        // check if user exist
        const user = await isEmailAlreadyExist(email)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "user does not exist please signup"
            })
        }

        // checking if user is signed in
        if(user.isVerified != true){
            return res.status(400).json({
                success:false,
                message:"user is not verified please sign in"
            })
        }


        // comapare password
        const isPasswordMatching = await bcrypt.compare(password, user.password)
        if(!isPasswordMatching){
            return res.status(400).json({
                success:false,
                message:"password is incorrect"
            })
        }

        // generate jwt token
        const payload = {
            id: user._id,
            userName: user.userName,
            email: user.email
        }

        const token = jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET, {expiresIn: '1h'});

        // generate cookie
        const options = {
            expires: new Date(Date.now() + 3*60*60*24*1000),
            httpOnly:true,
        }
        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:"logged in success"
        })
        

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"error in login",
            error:err
        })
    }
}

