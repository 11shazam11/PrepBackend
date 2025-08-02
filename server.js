import app from "./index.js";
import getResponse from "./Features/Gemini/getResponse.js";
import connectDB from "./Features/DB/mongoConfig.js";
// For job ide 
// import getJobs from "./Features/InternApi/internApi.js";

app.listen(3000, async () => {
    console.log("server is Listening on 3000");
    //DB CONFIG
    
    await connectDB();
    //google api
    // const response = await getResponse("what is the date today");
    // console.log(response);
    // for intern job Idea
    // await getJobs();
})