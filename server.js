require("dotenv").config();
const express = require("express");
require("./db.js");
const Person = require("./models/person.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(express.json());

app.use(passport.initialize());

const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()})], Request made to : ${req.originalUrl}`,
  );
  next();
};

app.use(logRequest);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Step A: Look up the user in MongoDB by their username
      const user = await Person.findOne({ username: username });

      // If no user matches that name, stop and return false
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // Step B: Compare the incoming plain text password with the hashed database password
      const isMatch = await user.comparePassword(password);

      // If the password doesn't match, stop and return false
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      // Step C: If both pass, authentication is successful Pass the user object forward.
      return done(null, user);
    } catch (err) {
      // If a database error or code crash happens, return the error
      return done(err);
    }
  }),
);

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/",  function (req, res) {
  res.send("Welcome to the Website");
});

const personRoutes = require("./routes/personRoutes.js");

app.use("/person", localAuthMiddleware, personRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
