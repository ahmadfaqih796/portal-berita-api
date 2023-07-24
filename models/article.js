module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      judul: {
        type: DataTypes.STRING,
      },
      deskripsi: {
        type: DataTypes.STRING,
      },
      id_user: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "article", // Nama tabel di database
    }
  );

  // Definisikan hubungan dengan model-model lain di sini jika diperlukan
  // Article.associate = (models) => {
  //   ...
  // };

  return Article;
};
