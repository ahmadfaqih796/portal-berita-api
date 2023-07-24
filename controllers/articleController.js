const { Article, Users } = require("../models");

const getAllArticle = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, name } = req.query;
    const offset = (page - 1) * limit;
    const whereCondition = search
      ? {
          $or: [
            { judul: { $like: `%${search}%` } },
            { deskripsi: { $like: `%${search}%` } },
          ],
        }
      : {};
    const includeData = {
      model: Users,
      as: "created_by",
      attributes: ["id", "name"],
      ...(name && {
        where: {
          name: {
            $like: `%${name}%`,
          },
        },
      }),
    };

    const total = await Article.count({ where: whereCondition || includeData });
    const article = await Article.findAll({
      where: whereCondition,
      include: [includeData],
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
    const article = await Article.findByPk(id);
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

const deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    await article.destroy();
    res.status(200).json({ message: "Article deleted successfully" });
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
  deleteArticleById,
};
