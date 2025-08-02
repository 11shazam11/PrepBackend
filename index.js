import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import { v4 as uuid } from "uuid";
import cors from "cors";
import cookieParser from "cookie-parser";
//routes
import trailrouter from "./Features/Trial/trialRoutes.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend
    credentials: true, // ✅ MUST for cookies to work
  })
);
app.use(cookieParser());

//session 
// app.use(session({
//     secret:"my-secret-value",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }));
// //Assign an unique id if not assigned
// app.use((req,res,next)=>{
//     if(!req.session.userId){
//         req.session.userId = uuid();
//         console.log("New session id has been assigned",req.session.userId);
//     }else{

//         console.log("Existing session id:", req.session.userId);
//     }
//     next();
// })

// app.use("/", (req, res) => {
//     res.send("Welcome to the file upload service");
// });
app.use("/trials", trailrouter);

export default app;
