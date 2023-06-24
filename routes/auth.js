// routes/auth.js

const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Register route
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  User.create({ username, password })
    .then(() => {
      res.status(201).json({ message: "User registered successfully." });
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).json({ error: "Failed to register user." });
    });
});

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password." });
      }

      res.json({ message: "Login successful." });
    })
    .catch((err) => {
      console.error("Error logging in:", err);
      res.status(500).json({ error: "Failed to log in." });
    });
});

module.exports = router;
