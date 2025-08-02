import multer from "multer";
import express from "express";
import { fileModel } from "./fileSchema.js";



//storing the buffer
async function hadelFile(req, res) {

    try {
        
        const userId = req.cookies.userId;
        const recivedFile = new fileModel({
            fileName: req.file.originalname + Date.now(), // Fixed the Date.now() usage
            contentType: req.file.mimetype,
            data: req.file.buffer,
            uploadedBy:userId
        });
        const newFile = await recivedFile.save();
        res.status(200).send({ message: "File uploaded successfully" ,createdFile: newFile});
    } catch (error) {
        return res.status(500).send({ message: "File handling error", error });
    }
}

export default hadelFile;