import express from "express";
import hadelFile from "../FileHandler/fileHnadling.js";
import multer from "multer";
import TrialController from "./trialController.js";
import usageLimiter from "./trialLimiter.js";

const trialController = new TrialController();


const trailrouter = express.Router();

//multer config 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



trailrouter.post("/upload", upload.single("file"),usageLimiter, hadelFile);
trailrouter.post("/dataExtract/:id",usageLimiter,(req,res)=>{
    trialController.dataExtract(req,res);
});
trailrouter.post("/questions/simple",usageLimiter,(req,res)=>{
    trialController.simpleQuestion(req,res);
})
trailrouter.get("/:id",usageLimiter,(req,res)=>{
    trialController.sendFiles(req,res);
});




export default trailrouter;