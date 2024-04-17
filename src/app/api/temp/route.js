
import {connect} from "@/config/dbConfig";

import { NextRequest,NextResponse } from "next/server";

// import {User} from "@/models/User";

connect();


export default async function GET(){


    try{

        console.log("hellow");

        // const newUser = await User.create()


        return NextResponse.json({


            message:"helow"

        })



    }catch(error){

        console.log(error);

    }
}


