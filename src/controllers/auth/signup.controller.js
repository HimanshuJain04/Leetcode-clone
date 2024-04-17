import { z } from 'zod';
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { generateOTP } from "@/helper/generateOtp";


const signupSchema = z.object({
    fullName: z.string(),
    userName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

export const signup = async (req, res) => {
    try {
        // get data from body
        const body = await req.json();

        // Validate request body
        try {
            signupSchema.parse(body);
        } catch (validationError) {
            // If validation fails, return error response
            return res.status(400).json({
                message: "Validation error",
                success: false,
                error: validationError.errors,
                data: null
            });
        }

        // fetch data from body
        const { fullName, userName, email, password } = body;

        // Check if the password length is less than 8 characters
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password length must be at least 8 characters",
                success: false,
                error: "Password length is less than 8 characters",
                data: null,
            });
        }

        // If userName is not unique, return error response
        if (!isUserNameUnique(userName)) {
            return res.status(400).json({
                message: "Username is already taken",
                success: false,
                data: null
            });
        }

        // hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        // If everything is okay, send OTP or perform further steps

        const otp = generateOTP();


        // return success response
        return res.status(200).json({
            message: "Signup successfully",
            success: true,
            data: null,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server failed to signup, try again later",
            success: false,
            data: null,
            error: error.message,
        });
    }
}

