require("dotenv").config();
const express = require("express");
require("./db.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hello world");
});

const personRoutes = require("./routes/personRoutes.js");

app.use("/person", personRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
