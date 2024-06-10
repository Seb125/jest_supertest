const express = require("express");
const path = require("path");
const User = require("./model");

function makeApp(database) {
  const app = express();

  // Middleware to parse JSON bodies
  app.use(express.json());

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.post("/addUser", async (req, res) => {
    const { name} = req.body;
    const response = await database.createUser(name)
    console.log(response);
    //res.send({ userId });
       
  });

  app.get("/data", async (req, res) => {
    try {
      
      const data = await database.getUserData();
      console.log("here");
      res.status(200).json({data: data});
    } catch (error) {
      console.log(error);
    }
  });

  return app;
}

module.exports = makeApp;
