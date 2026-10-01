const express = require("express");
const { connectDb } = require("./config/database");

const app = express();

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
