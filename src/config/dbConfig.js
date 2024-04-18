import mongoose from "mongoose";

export const dbConnection = async () => {

    mongoose
        .connect(process.env.DATABASE_URL, {})
        .then(() => {
            console.log("Database Conenction successfull!")
        })
        .catch((error) => {
            console.log("Database Connection failed! : ", error)
        });
}



