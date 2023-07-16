const Sequelize = require("sequelize");
const UserModel = require("./users");
const ArticleModel = require("./article");
const connection = require("../config/database");

const models = {
  // Tambahkan model-model lain di sini
  Users: UserModel(connection, Sequelize.DataTypes),
  Article: ArticleModel(connection, Sequelize.DataTypes),
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

module.exports = { connection, ...models };
