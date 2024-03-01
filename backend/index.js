const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 3000;

app.use(express.json());
// Available Routes
app.get("/", (req, res) => {
  res.send("Hello, Rahul!");
});
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/dashboard", require("./routes/dashboard"))

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
