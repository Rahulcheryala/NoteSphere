const mongoose = require("mongoose");

const mongooseURI = "mongodb://localhost:27017/";

const connectToMongo = () => {
  mongoose
    .connect(mongooseURI)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
};

module.exports = connectToMongo;
