import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "minervis";
const yourPassword = "password123";
const yourAPIKey = "5e64b60b-a9f4-459f-b5c6-6d38d28c8fa7";
const yourBearerToken = "44fb8cd8-77af-4b94-8a46-cb0f2eaa6c18";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const content = JSON.stringify(response.data);
    console.log(content);
    res.render("index.ejs", { content: content })

  } catch (error) {
    console.error("Failed to make request", error.message);
    res.render("index.ejs", {
      error: "Ooops soz-burger"
    })
  }

});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
 try {
  const page = 2; 
  const response = await axios.get(`https://secrets-api.appbrewery.com/all?page=${page}`, {
    auth: {
      username: yourUsername,
      password: yourPassword
    }
  })
  const content = JSON.stringify(response.data); 
  res.render("index.ejs", { content: content }); 
  
 } catch (error) {
  console.error("Failed to make request", error.message);
  res.render("index.ejs", {
    error: "Ooops soz-burger"
  })
  }  
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const emScore = 5;
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=${emScore}&apiKey=${yourAPIKey}`);
    const content = JSON.stringify(response.data);
    res.render("index.ejs", { content: content });
  } catch (error) {
    console.error("Failed to make request", error.message);
    res.render("index.ejs", {
      error: "Ooops soz-burger"
    })
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
 const secretId = 42;
 try {
  const response = await axios.get(`https://secrets-api.appbrewery.com/secrets/${secretId}`, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    }
  });
  const content = JSON.stringify(response.data);
  res.render("index.ejs", { content: content });
 } catch (error) {
  console.error("Failed to make request", error.message);
  res.render("index.ejs", {
    error: "Ooops soz-burger"
  })
 }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
