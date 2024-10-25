// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req,res) => {
    try {
        const response = await axios.get(API_URL + "/random");
        //const result = JSON.stringify(response.data); 
        // console.log(result);
        // console.log(result.secret);
        // console.log(result.username);
        console.log(response.secret);
        console.log(response.username);
        //console.log(response);
        // console.log(typeof result);
        res.render("index.ejs", {
            secret: response.data.secret,
            user: response.data.username
        });
    } catch (error) {
        res.render("index.ejs", { secret: "I dunno dawg" });
    }
})

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.



// 6. Listen on your predefined port and start the server.
