'use server'

//lib para se conectar ao mongodb usando o URI dentro do .env
import mongoose from "mongoose";

export default async function connectToDatabase() {

    try {

        const uri = process.env.MONGODB_URI;

        await mongoose.connect(uri);
        console.log("Connected to database");

    } catch (error) {

        console.log("Error connecting to database. Error: ", error.message);
    }
}