// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const User = sequelize.define("users", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING,
//   },
// });

// module.exports = User;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users", // Nama tabel di database
    }
  );

  // Definisikan hubungan dengan model-model lain di sini jika diperlukan
  // User.associate = (models) => {
  //   ...
  // };

  return User;
};
