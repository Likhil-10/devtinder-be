const express = require("express");
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestsRouter } = require("./routes/requests");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);

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
