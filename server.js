require("dotenv").config();

const express = require("express");

require("./db.js");

const person = require("./models/person.js");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.get("/person", async function (req, res) {
  try {
    const data = await person.find();
    console.log("Data fetched successfully!");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/person/:id", async function (req, res) {
  try {
    const personId = req.params.id;
    const response = await person.findById(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/person", async function (req, res) {
  try {
    const data = req.body;

    const newPerson = new person(data);

    const response = await newPerson.save();

    console.log("Data saved Successfully");
    res.status(201).json(response);
  } catch (err) {
    console.error("Error saving person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/person/:id", async function (req, res) {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated successfully!");
    res.status(200).json(response);
  } catch (err) {
    console.error("Error updating person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/person/:id", async function (req, res) {
  try {
    const personId = req.params.id;

    const response = await person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data deleted successfully!");
    res
      .status(200)
      .json({ message: "Person deleted successfully from the server" });
  } catch (err) {
    console.error("Error deleting person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
