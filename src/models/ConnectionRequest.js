const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "Invalid status value: {VALUE}",
      },
    },
  },
  { timestamps: true },
);

const ConnectionRequest = model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;