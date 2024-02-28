const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello, Rahul!");
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
