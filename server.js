require("dotenv").config();
const express = require("express");
require("./db.js");

const passport = require("./auth.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()})], Request made to : ${req.originalUrl}`,
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Welcome to the Website");
});

const personRoutes = require("./routes/personRoutes.js");

app.use("/person", personRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
