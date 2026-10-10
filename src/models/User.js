const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: [3, "Give at least 3 bro"],
      maxLength: [15, "Who tf are you, we accept only 15 chars"],
    },
    lastName: {
      type: String,
      minLength: [3, "Give at least 3 bro"],
      maxLength: [15, "Who tf are you, we accept only 15 chars"],
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Tf is that email bro, give a valid one",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Give more lol"],
    },
    age: {
      type: Number,
      min: [18, "You are too young, grow up kid"],
      max: [69, "Unc just retire atp, this shit ain't for you."],
    },
    gender: {
      type: String,
      validate: {
        validator: function (value) {
          const allowedGenders = ["male", "female"];
          return allowedGenders.includes(value);
        },
        message: "Only Straight people are allowed.",
      },
    },
    skills: [String],
    pfp: {
      type: String,
      default:
        "https://i.pinimg.com/originals/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg?nii=t",
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);
module.exports = User;
