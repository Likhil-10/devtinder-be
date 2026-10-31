const express = require("express");
const User = require("../models/User");
const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    validateSignUp(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.error("Error saving user: ", err);
    res.status(400).send("Error saving user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    } else {
      const isPasswordValid = await user.verifyPassword(password);

      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      } else {
        const token = user.getJwt();
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
        res.send("Login Successful");
      }
    }
  } catch (err) {
    console.error("Error logging in user: ", err);
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logged out successfully!!!");
});

authRouter.patch("/changepassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const isCurrentPasswordRight = await bcrypt.compare(
      currentPassword,
      loggedInUser.password,
    );
    if (!isCurrentPasswordRight) {
      throw new Error("Current password is wrong.");
    }
    if (currentPassword === newPassword) {
      throw new Error("You can't keep the same password.");
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser["password"] = newHashedPassword;
    await loggedInUser.save();
    res.send(loggedInUser);
  } catch (err) {
    console.error("Error changing password: ", err);
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = { authRouter };
