// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authcontroller");

router.post("/login", login);

module.exports = router;

