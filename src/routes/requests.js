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
      const data = await newRequest.save();
      res.json({ message: "Connection request sent successfully.", data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  },
);

requestsRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const { status, requestId } = req.params;

      const allowedStatuses = ["accepted", "rejected"];
      if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).send("Connection request not found.");
      }

      connectionRequest.status = status;

      const updatedRequest = await connectionRequest.save();
      res.json({
        message: `Connection request ${status} successfully.`,
        data: updatedRequest,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

module.exports = { requestsRouter };
