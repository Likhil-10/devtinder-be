const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/ConnectionRequest");

const SHARABLE_FIELDS = "firstName lastName about skills age pfp";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", SHARABLE_FIELDS);

    res.json({
      message: "Pending connection requests retrieved successfully.",
      data: pendingRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const acceptedRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", SHARABLE_FIELDS)
      .populate("toUserId", SHARABLE_FIELDS);

    const data = acceptedRequests.map((req) => {
      if (loggedInUser._id.equals(req.fromUserId._id)) {
        return req.toUserId;
      }
      return req.fromUserId;
    });

    res.json({ message: "Connections fetched successfully.", data });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = {
  userRouter,
};
