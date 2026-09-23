const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("/ route");
});

app.listen(1111, () => {
  console.log("Server started lol");
});
