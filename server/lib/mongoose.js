const mongoose = require("mongoose");

const mongooseInit = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB Connection Established . . .");
    })
    .catch((err) => {
      console.log("Failed Connecting to Mongodb . . .");
      console.log(err);
    });
};

module.exports = {
  mongooseInit,
};
