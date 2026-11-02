const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/ConnectionRequest");

const requestsRouter = express.Router();

requestsRouter.post(
  "/connection/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { status, toUserId } = req.params;

      const allowedStatuses = ["ignored", "interested"];
      if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status value.");
      }

      const existingRequests = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingRequests) {
        throw new Error(
          "Connection Request already exists between these users.",
        );
      }

      const newRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await newRequest.save();
      res.status(200).send("Request sent successfully");
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  },
);

module.exports = { requestsRouter };
