// ✅ models/Response.js
const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  answers: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Response", responseSchema);
