
const mongoose = require("mongoose");
export async function connect(){

    try{


        console.log("database usrl ",process.env.DATABASE_URL);

        let url = "mongodb+srv://leetcode:leetcode@cluster0.wzdfurj.mongodb.net/";

        await mongoose.connect(url);
        
        const connection = mongoose.connection;
        
        connection.on("connected",()=>  {
            
            console.log("connected to the database ");

        })
        
        connection.on("error",(err)=>{

            console.log("connection error",err);
            

        }) 

    }
    
    catch(error){

        console.log("error ocuur whil connectin to the db ",error)

    }


}

