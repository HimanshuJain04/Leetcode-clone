
import { z } from 'zod';

import problemModel from '@/models/problem.model';

import testcaseModel from '@/models/testcase.model';

import {dbConnection} from "@/config/dbConfig";

dbConnection();


const testcaseSchema = z.object({

    questionId: z.string().uuid(),
    input: z.string(),
    output: z.string(),

})

export async function createTestCase(req, res) {


    try {

        const body = await req.json();

        try {

            testcaseSchema.parse(body);


        } catch (error) {


            console.log(error);

            return res.status(400).json({

                message: "all fields are not match  ",
                data: null

            })

        }


        // fetch the data 

        const { questionId, input, output } = req.body;

        // 

        const isProblemExists = await problemModel.findById(questionId);


        // check this problem exists with this problem id 

        if (!isProblemExists) {


            return res.status(400).json({

                message: "no problem is exists with this problem id ",
                data: null

            })
        }


        // create a new test case 

        const newTestCase = await testcaseModel.create({

            questionId,
            input,
            output,

        })


        // push this test case in to the problem schema 

        problemModel.testCases.push(newTestCase._id);

        await problemModel.save();

        // successfully return the resposne 

        return res.status(200).json({

            sucess: true,
            message: "test case is created successfully",

        });

    } catch (error) {

        console.log(error);

        return res.status(400).json({

            message: "some error occur while creating test case",
            error: error.message,

        })

    }
}




export async function deleteTestCase(req, res) {

    try {

        const testCaseId = req.nextUrl.searchParams.get("testCaseId");

        // check test case filed is  not empty 
        
        if (!testCaseId) {

            return res.status(400).json({

                sucess: false,
                message: "no test case id is provided",

            });
        }

        // Delete the test case from the testCaseModel

        await testcaseModelestCaseModel.findByIdAndDelete(testCaseId);

        // Update the testCases field in the problemModel

        await problemModel.updateOne(
            {
                testCases: { $elemMatch: { _id: testCaseId } },
            },
            { $pull: { testCases: { _id: testCaseId } } }
        );

        return res.status.json({

            success:true,
            message:"test case deleted sucessfully ",

        })


    } catch (error) {


        console.log(error);

        return res.status(400).json({

            message: "some error occur while creating delete case",
            error: error.message,

        })

    }

}




export async function updateTestCase(req,res){

    try{

        const body = await req.json();
        
        // check test case filed is  not empty 
        
        if (!testCaseId) {


            return res.status(400).json({

                sucess: false,
                message: "no test case id is provided",

            });
        }


        // find the test case is exists or not 

        const isTestCaseExists = await testcaseModel.findById(testCaseId);

        if(!isTestCaseExists) {

            return res.status(400).json({

                sucess: false,
                message: "no test case exists with this testCase ID ",

            });
        }

        
        if(body.input !== undefined) {

            isTestCaseExists.input = body.input;

        }

        if(body.output !== undefined) {

            isTestCaseExists.output = body.output;


        }


        // successfully return the result 

        return res.status(200).json({

            data:null,
            message:"test case updated successfully",

        })

        
    }catch(error){

        console.log(error);

        return res.status(400).json({

            message: "some error occur while creating delete case",
            error: error.message,

        })

    }
}



