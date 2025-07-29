const express = require("express");
const Form = require("../models/Form");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, elements } = req.body;
    const newForm = new Form({ title, elements });
    await newForm.save();
    res.status(201).json({ message: "Form saved successfully", form: newForm });
  } catch (error) {
    console.error("🔥 Error saving form:", error); // 👈 ye line add kar
    res.status(500).json({ message: "Error saving form", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error });
  }
});
// GET - Single form by ID
router.get("/:formId", async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form", error });
  }
});

// PUT - Update existing form
router.put("/:formId", async (req, res) => {
  try {
    const { title, elements } = req.body;
    const updated = await Form.findByIdAndUpdate(
      req.params.formId,
      { title, elements },
      { new: true }
    );
    res.status(200).json({ message: "Form updated successfully", form: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update form", error: err });
  }
});

// DELETE - Delete a form by ID
router.delete("/:formId", async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.formId);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form", error });
  }
});


module.exports = router; // ✅ Important for CommonJS
