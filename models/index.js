// models/index.js

const Sequelize = require("sequelize");
const UserModel = require("./users");
const connection = require("../config/database");

// const sequelize = new Sequelize("database", "username", "password", {
//   // konfigurasi koneksi ke database
// });

const models = {
  User: UserModel(connection, Sequelize.DataTypes),
  // Tambahkan model-model lain di sini jika diperlukan
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

module.exports = { connection, ...models };
