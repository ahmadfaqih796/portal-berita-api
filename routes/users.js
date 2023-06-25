const express = require("express");
const usersController = require("../controllers/usersController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Menambahkan middleware authenticateToken untuk memeriksa token pada semua rute user
router.use(authenticateToken);

// Rute untuk mendapatkan semua pengguna
router.get("/", usersController.getAllUsers);

// Rute untuk mendapatkan satu pengguna berdasarkan ID
router.get("/:id", usersController.getUserById);

// Rute untuk memperbarui pengguna berdasarkan ID
router.patch("/:id", usersController.updateUserById);

// Rute untuk menghapus pengguna berdasarkan ID
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
