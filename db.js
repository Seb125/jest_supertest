const mongoose = require("mongoose");
const User = require("./model");



const MONGO_URI =
"mongodb://localhost:27017";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = "docker"
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

function createUser(name, email, password) {
    const newData = new User({ name: name, email: email, password: password });
    newData.save();
}

const getUserData = async () => {
  const userData = await User.find();
  return userData;
}


module.exports = { createUser, getUserData };