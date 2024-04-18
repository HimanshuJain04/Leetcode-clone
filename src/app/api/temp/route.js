import { dbConnection } from "@/config/dbConfig";

dbConnection();


export default async function GET() {

    try {

        console.log("hellow");

        return NextResponse.json({


            message: "helow"

        })



    } catch (error) {

        console.log(error);

    }
}

