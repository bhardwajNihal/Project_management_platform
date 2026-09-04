import express from "express"
import "dotenv/config"
import cors from "cors"
import { connectToDb } from "./db/index.js";


// intializing basic express app
const app = express();

// configuring express
app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({                // to parse complexly encoded url, sent by older html forms
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"));              // to serve static files from the server (usually, used in older applications where the express served both the frontend i.e. raw html and css file, and the backend, along with the static assets like images and logo.)


// configuring cors
app.use(cors({
    origin : process.env.CORS_ORIGIN.split(",") || "http://localhost:5173",    // defauld react+vite port
    credentials : true,             // for cookies
    methods : ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
    allowedHeaders : ["content-type", "Authorization"]
}))



const PORT = process.env.PORT || 3000;

// async function, port starts listening only on successfull db connection
(async () => {

    await connectToDb()         // either, connects, or process exits throwing error.
    app.listen(PORT, () => {
    console.log(`Server active at ${process.env.BASE_URL}:${PORT}`);
    })

})()            // IIFE
