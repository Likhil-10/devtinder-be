const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("/ hahahah");
// });

app.get("/user", (req, res) => {
  res.send({ firstName: "likhil", lastName: "Damurothu" });
});

app.post("/user", (req, res) => {
  // logic to save
  res.send("user saved successfully");
});

app.delete("/user", (req, res) => {
  // logic to delete
  res.send("user deleted");
});

app.listen(1111, () => {
  console.log("Server started lol");
});
