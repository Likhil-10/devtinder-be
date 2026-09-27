const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllUsers", (req, res) => {
  res.send("All users sent");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});

app.get(
  "/user/:userId/:name",
  userAuth,
  (req, res, next) => {
    // console.log(req.query); // for params
    // console.log(req.params); // for path variable items
    // res.send({ firstName: "likhil", lastName: "Damurothu" });
    next();
  },
  [
    (req, res, next) => {
      // res.send("2nd fun");
      next();
      console.log("after next lol");
    },
    (req, res, next) => {
      res.send("3rd fun");
      // next();
      console.log("after next lol");
    },
  ],
);

app.post("/user", (req, res) => {
  // logic to save
  res.send("user saved successfully");
});

app.delete("/user", (req, res) => {
  // logic to delete
  res.send("user deleted");
});

app.use("/", (req, res) => {
  res.status(500).send("Something went wrong");
});

app.listen(1111, () => {
  console.log("Server started lol");
});
