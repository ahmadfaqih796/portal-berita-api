const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_berita", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
