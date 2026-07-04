const express = require("express");
const router = express.Router();

const Person = require("../models/person.js");

router.get("/", async function (req, res) {
  try {
    const data = await Person.find();
    console.log("Data fetched successfully!");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async function (req, res) {
  try {
    const workType = req.params.workType;

    if (
      workType === "Chef" ||
      workType === "Waiter" ||
      workType === "Manager" ||
      workType === "Developer"
    ) {
      const filteredData = await Person.find({ work: workType });
      console.log(`${workType} list fetched successfully!`);
      return res.status(200).json(filteredData);
    } else {
      return res.status(400).json({ error: "Invalid work type specified" });
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/:id", async function (req, res) {
//   try {
//     const personId = req.params.id;
//     const response = await Person.findById(personId);

//     if (!response) {
//       return res.status(404).json({ error: "Person not found" });
//     }

//     res.status(200).json(response);
//   } catch (err) {
//     console.error("Error fetching person:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post("/", async function (req, res) {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("Data saved Successfully");
    res.status(201).json(response);
  } catch (err) {
    console.error("Error saving person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        returnDocument: "after",
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

router.delete("/:id", async function (req, res) {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

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

module.exports = router;
