module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        // unique: true,
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
  Users.associate = (models) => {
    Users.hasMany(models.Article, {
      foreignKey: "id_user",
      as: "created_by",
    });
  };

  return Users;
};
