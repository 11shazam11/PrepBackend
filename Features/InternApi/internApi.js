// File: fetchInternships.js// Required only if you're on Node <18

async function getJobs(){
    const url = "https://internships-api.p.rapidapi.com/active-jb-7d";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.API_KEY,
    "x-rapidapi-host": "internships-api.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error("Error fetching data:", error);
}

}
export default getJobs;