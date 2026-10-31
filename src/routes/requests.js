const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sent a request!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = { requestsRouter };
