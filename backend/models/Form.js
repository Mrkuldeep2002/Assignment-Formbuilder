// models/Form.js
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  elements: {
    type: Array,
    default: [],
  },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
