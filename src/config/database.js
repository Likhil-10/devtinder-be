const mongoose = require("mongoose");

const connectDb = () => {
  return mongoose.connect(
    "mongodb+srv://likhil1234_db_user:likhil1234_db_password@cluster0.bu58acr.mongodb.net/",
  );
};

module.exports = {
  connectDb,
};
