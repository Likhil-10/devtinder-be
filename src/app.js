const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./models/User");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const newUser = new User(req.body);
  console.log("payload data", req.body);
  try {
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.error("Error saving user: ", err);
    res.status(400).send("Error saving user");
  }
});

connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(1111, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.error("Database connection failed: ", err);
  });
