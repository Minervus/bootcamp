import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.

function randomNumber(min,max) {
  return Math.floor(Math.random() * (max - min +1) + min);
}

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;

    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  console.log(req.body.type)
  console.log(req.body.participants)

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.


  // try {
  //   const response = await axios({
  //     method: 'post',
  //     url: "https://bored-api.appbrewery.com/filter",
  //     data: {
  //       type: req.body.type,
  //       participants: req.body.participants
  //     }
  //   });
  //   const result = response.data; 
  //   res.render("index.ejs", {data: result });

  // } catch (error) {
  //   console.error("Failed to make request:", error.message);
  //   res.render("index.ejs", {
  //     error: error.message,
  //   });
  // }

  // try {
  //   const response = await axios.post("https://bored-api.appbrewery.com/filter", {
  //     type: `${req.body.type}`,
  //     participants: `${req.body.participants}`
  //   })
  //   const result = response.data; 
  //   console.log(`result is ${result}`)
  //   res.render("index.ejs", {data: result });

  // } catch (error) {
  //   console.error("Failed to make request:", error.message);
  //   res.render("index.ejs", {
  //     error: error.message,
  //   });
  // }



  // axios.post('https://bored-api.appbrewery.com/filter', {
  //   type: `${req.body.type}`,
  //   lastName: `${req.body.participants}`
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  
  // try {
  //   const response = await axios.post("https://bored-api.appbrewery.com/filter", {
  //     type: req.body.type,
  //     participants: req.body.participants
  //   });
  //   const result = response.data;
  //   console.log(result);
  //   //res.render("index.ejs", {data: result}); 
  // } catch (error) {
  //   console.error("Failed to make request:", error.message);
  //   res.render("index.ejs", {
  //     error: error.message,
  //   });
  // }


  const type = req.body.type;
  const participants = req.body.participants
 

 try {
  const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`)
  const result = response.data; 
  const activity = result[randomNumber(0,result.length)]
  
  res.render("index.ejs", {data: activity})

 } catch (error) {
  console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
 }



});


  



  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
