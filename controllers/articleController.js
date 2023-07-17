const { Article } = require("../models");

const getAllArticle = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const total = await Article.count();
    const article = await Article.findAll({
      offset,
      limit: parseInt(limit),
    });
    res.status(200).json({
      total,
      limit: parseInt(limit),
      skip: offset,
      data: article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createArticle = async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const article = await Article.create({
      judul: judul,
      deskripsi: deskripsi,
    });
    res
      .status(200)
      .json({ message: "Berhasil membuat article", data: article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi } = req.body;
    const article = await Users.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    article.judul = judul;
    article.deskripsi = deskripsi;
    await article.save();
    res.status(200).json({ message: "Article updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllArticle,
  getArticleById,
  createArticle,
  updateArticleById,
};
