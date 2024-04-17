import { z } from 'zod';
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { generateOTP } from "@/helper/generateOtp";
import { sendMail } from '@/helper/sendMail';


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
        } catch (error) {
            // If validation fails, return error response
            return res.status(400).json({
                message: "Validation error",
                success: false,
                error: error.errors,
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

        // If email exist  return error response
        if (!isEmailAlreadyExist(email)) {
            return res.status(400).json({
                message: "Email already registered, Please login to continue",
                error: "Email already registered, Please login to continue",
                success: false,
                data: null
            });
        }

        // If userName is not unique, return error response
        if (!isUserNameAlreadyExist(userName)) {
            return res.status(400).json({
                message: "Username is already taken",
                error: "Username is already taken",
                success: false,
                data: null
            });
        }

        // hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        // If everything is okay, send OTP or perform further steps
        const generatedOtp = generateOTP();

        const mailResponse = await sendMail(
            {
                sendTo: email,
                subject: "Verify your email",
                body: generatedOtp
            }
        );

        console.log("Mail: ", mailResponse);

        const imageUrl = `https://ui-avatars.com/api/?name=${fullName}`;

        // create entry in db
        const createdUser = await User.create(
            {
                userName,
                fullName,
                email,
                password: hashedPass,
                profileImg: imageUrl,
                otp: generateOTP,
            }
        );

        // return success response
        return res.status(200).json({
            message: "Signup successfully",
            success: true,
            data: createdUser,
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

