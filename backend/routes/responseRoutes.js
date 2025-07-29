const express = require("express");
const Response = require("../models/Response");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { formId, answers } = req.body;
    const newResponse = new Response({ formId, answers });  // ✅ Error was here
    await newResponse.save();
    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("🔥 Error saving response:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:formId", async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching responses", error });
  }
});

module.exports = router; // ✅
