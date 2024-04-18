

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

const PAGE_SIZE = 10;


// create problem
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

// get problem details by id
export const getProblemById = async (req, res) => {
    try {

        const problemId = req.nextUrl.searchParams.get("problemId");

        if (!problemId) {
            return res.status(404).json({
                message: "Problem id not found",
                success: false,
                data: null,
                error: "Problem id not found",
            });
        }

        const problemDetail = await Problem.findById(problemId);

        // return success response
        return res.status(200).json({
            message: "Get problem by id successfully",
            success: true,
            data: problemDetail,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server failed to get problem by id, try again later",
            success: false,
            data: null,
            error: error.message,
        });
    }
}

// get all problems with pagination concept
export const getAllProblems = async (req, res) => {
    try {

        const index = req.nextUrl.searchParams.get("index") || 0;

        const problems = await Problem
            .find()
            .skip(index * PAGE_SIZE)
            .limit(PAGE_SIZE);

        // return success response
        return res.status(200).json({
            message: "Get problem by id successfully",
            success: true,
            data: problems,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server failed to get problem by id, try again later",
            success: false,
            data: null,
            error: error.message,
        });
    }
}


// delete problem
export const deleteProblem = async (req, res) => {
    try {

        const problemId = req.nextUrl.searchParams.get("problemId");

        if (!problemId) {
            return res.status(404).json({
                message: "Problem id not found",
                success: false,
                data: null,
                error: "Problem id not found",
            });
        }

        const problemDetail = await Problem.findByIdAndDelete(problemId);

        // return success response
        return res.status(200).json({
            message: "Delete problem by id successfully",
            success: true,
            data: problemDetail,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server failed to delete problem by id, try again later",
            success: false,
            data: null,
            error: error.message,
        });
    }
}


// update problem