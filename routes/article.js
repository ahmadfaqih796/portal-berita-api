const express = require("express");
const articleController = require("../controllers/articleController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Menambahkan middleware authenticateToken untuk memeriksa token pada semua rute user
router.use(authenticateToken);

// Rute untuk mendapatkan semua pengguna
router.get("/", articleController.getAllArticle);
router.post("/", articleController.createArticle);

module.exports = router;
