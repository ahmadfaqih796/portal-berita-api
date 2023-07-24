const express = require("express");
const articleController = require("../controllers/articleController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.get("/", articleController.getAllArticle);
router.get("/:id", articleController.getArticleById);
router.post("/", articleController.createArticle);
router.patch("/:id", articleController.updateArticleById);
router.delete("/:id", articleController.deleteArticleById);

module.exports = router;
