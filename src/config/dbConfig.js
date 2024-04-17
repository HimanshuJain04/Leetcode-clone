

const mongoose = require("mongoose");

export default  async function DbConnect (){


    try{

        console.log("database url ",process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGODB_URI, {}).then((data)=>{


            console.log("db connected sucessfully ");

        }).catch((error)=>{

            console.log(error.message);


        })


    }
    catch(error){

        console.log(error);

    }
}


