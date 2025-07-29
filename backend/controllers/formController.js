// backend/controllers/formController.js
const Form = require("../models/Form");

exports.saveForm = async (req, res) => {
  try {
    const { json } = req.body;
    const form = await Form.create({
      title: json.title || "Untitled Form",
      json,
      createdBy: req.adminId,
    });
    res.status(201).json({ message: "Form saved", form });
  } catch (err) {
    res.status(500).json({ message: "Error saving form", error: err.message });
  }
};
