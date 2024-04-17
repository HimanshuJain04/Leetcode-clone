

import Problem from "@/models/problem.model";
import { z } from 'zod';
import User from "@/models/user.model";
const { v4: uuidv4 } = require('uuid');


const problemSchema = z.object({
    title: z.string(),
    description: z.string(),
    questionType: z.enum(["Easy", "Medium", "Hard"]),
    topics: z.array(z.string()),
    companies: z.array(z.string()),
});


export const createProblem = async (req, res) => {
    try {
        // get data from body
        const body = await req.json();

        // Validate request body
        try {
            problemSchema.parse(body);
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
        const { title, description, questionType, topics, companies } = body;

        // create entry in problem db

        const createdProblem = await Problem.create(
            {
                title,
                description,
                questionType,
                topics,
                companies,
            }
        );


        // return success response
        return res.status(200).json({
            message: "problem created successfully",
            success: true,
            data: createdProblem,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server failed to create problem, try again later",
            success: false,
            data: null,
            error: error.message,
        });
    }
}

