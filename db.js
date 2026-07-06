const mongoose = require("mongoose");

 const dbURI = process.env.MONGO_URI;
// const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

module.exports = mongoose;
