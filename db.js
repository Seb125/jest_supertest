const mongoose = require("mongoose");
const User = require("./model");



const MONGO_URI =
"mongodb://localhost:27017";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

async function createUser(name) {
    const newData = new User({ name: name });
    const response = await newData.save();
    return response;
}

const getUserData = async () => {
  const userData = await User.find();
  return userData;
}


module.exports = { createUser, getUserData };