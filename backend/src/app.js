import express from "express";
import {createServer} from "node:http";
import {connectToSocket} from "./controllers/socketManager.js";
import { User } from "./models/user.model.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; // Ensure dotenv is imported
import userRoutes from "./routes/users.routes.js";

// Load environment variables from .env file
dotenv.config(); // {{ edit_1 }}

const app = express();
const server = createServer(app);
const io =  connectToSocket(server);

app.set("port", (process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({extended: true, limit: "40kb"}));

app.use("/api/v1/users",userRoutes);
// app.get("/",(req,res)=>{
//     res.json({message:"Hello World"});
// })

const url = process.env.MONGO_URL;

const start = async () => 
{
        const connectionDB =await mongoose.connect(url);
        console.log("Connected to MongoDB");
        console.log(connectionDB.connection.host);
        // console.log(connectionDB);
        // const user = new User({
        //     "name": "Ashitosh",
        //     "username": "ashitosh",
        //     "password": "ashitosh"
        // })

        // await user.save();


    server.listen(8080,()=>{
        console.log("Server is running on port 8080");
    })
}

start();



