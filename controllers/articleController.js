const { Article } = require("../models");

const getAllArticle = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const total = await Article.count();
    const users = await Article.findAll({
      offset,
      limit: parseInt(limit),
    });
    res.status(200).json({
      total,
      limit: parseInt(limit),
      skip: offset,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllArticle };
