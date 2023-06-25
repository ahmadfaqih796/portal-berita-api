// routes/auth.js

const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Register route
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  User.create({ username, password })
    .then(() => {
      res.status(201).json({ message: "Berhasil register user" });
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).json({ error: "Gagal register user" });
    });
});

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User tidak ditemukan" });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: "Pasword tidak valid" });
      }

      res.json({ message: "Berhasil login" });
    })
    .catch((err) => {
      console.error("Error logging in:", err);
      res.status(500).json({ error: "Gagal login" });
    });
});

module.exports = router;
