import mongoose from "mongoose";

async function connectDB(){    
    try{
        await mongoose.connect(
          `mongodb+srv://dhumneabhay:${process.env.MONGO_PASS}@cluster0.ku2vevs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        ).then(() => {
          console.log("Database connected successfully.");
        });
    }catch(er){
        console.log("Error connecting to the database:", er);
    }
}

export default connectDB;