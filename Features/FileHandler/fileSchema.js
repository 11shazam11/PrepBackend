import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileName:String,
    contentType:String,
    data:Buffer,
    uploadedBy:String
});

export const fileModel = mongoose.model("Files", fileSchema);   
