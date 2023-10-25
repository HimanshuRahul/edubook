import mongoose from "mongoose";


let alreadyDone = false;

const MONGO_URL = process.env["NEXT_PUBLIC_MONGODB_URL"]


// console.log("from inside dbconnect.ts env var of db - " + MONGO_URL2);



export async function ensureDbConnected() {
    if(alreadyDone){
        return;
    }
    alreadyDone = true;
    
    await mongoose.connect(MONGO_URL!, {dbName: "courseapp"}!)
}