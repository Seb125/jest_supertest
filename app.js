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

  app.post("/addUser", (req, res) => {
    const { name, email, password } = req.body;
    database
      .createUser(name, email, password)
      .then((userId) => {
        res.send({ userId });
        console.log("Document inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/data", async (req, res) => {
    try {
      const data = await User.find();
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
    }
  });

  return app;
}

module.exports = makeApp;
