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
    res.status(400).send("Error saving user: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length === 0) {
      res.status(404).send("Users not found)");
    } else {
      res.send(allUsers);
    }
  } catch (err) {
    console.error("Error fetching users: ", err);
    res.status(500).send("Error fetching users: " + err.message);
  }
});

app.get("/findByEmail", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.error("Error fetching user by email: ", err);
    res.status(500).send("Error fetching user by email: " + err.message);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.error("Error fetching user by ID: ", err);
    res.status(500).send("Error fetching user by ID: " + err.message);
  }
});

app.delete("/user/deleteById", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.error("Error deleting user by ID: ", err);
    res.status(500).send("Error deleting user by ID: " + err.message);
  }
});

app.patch("/user/updateById", async (req, res) => {
  try {
    const updatedUser = req.body;
    const userId = req.body.userId;

    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.error("Error updating user by ID: ", err);
    res.status(500).send("Error updating user: " + err.message);
  }
});

// update with email and findone
app.patch("/user/updateByEmail", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const updatedUser = req.body;
    const user = await User.findOneAndUpdate({ emailId }, updatedUser, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.error("Error updating user by email: ", err);
    res.status(500).send("Error updating user: " + err.message);
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
