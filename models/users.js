module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
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
  // Users.associate = (models) => {
  //   ...
  // };

  return Users;
};
