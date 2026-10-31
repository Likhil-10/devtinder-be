const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
          return validator.isEmail(value);
        },
        message: "Tf is that email bro, give a valid one",
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "You cant keep your password weak like your personality bro",
          );
        }
      },
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
    skills: {
      type: [
        {
          type: String,
          maxLength: [15, "Bro what kind of skill is that?"],
        },
      ],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "You can add only 5 skills bro",
      },
    },
    pfp: {
      type: String,
      default:
        "https://i.pinimg.com/originals/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg?nii=t",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Bro give a valid URL for pfp");
        }
      },
    },
    about: {
      type: String,
      default: "Add your about here....",
      maxLength: [50, "Max length is 50 chars."],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJwt = function () {
  const token = jwt.sign({ _id: this._id }, "MessiTheGoat", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.verifyPassword = async function (passwordEnteredByUser) {
  const isPasswordValid = await bcrypt.compare(
    passwordEnteredByUser,
    this.password,
  );
  return isPasswordValid;
};

const User = model("User", userSchema);
module.exports = User;
