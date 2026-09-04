// db connection logic
import mongoose from "mongoose"
import 'dotenv/config'

export const connectToDb = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("mongoDB connected!!!✅")
    } catch (error) {
        console.log("DB connection error!❌")
        console.error(error)
        process.exit(1) 
    }
}