const { Sequelize } = require("sequelize");

const { DB_SYNC } = process.env;
const { Op } = Sequelize;

const operatorsAliases = {
  // Daftar operatorAliases Anda
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const sequelizeConfig = {
  dialect: "mysql",
  host: "localhost",
  logging: false,
  operatorsAliases,
  define: {
    freezeTableName: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
};

const sequelize = new Sequelize("db_berita", "root", "", sequelizeConfig);

if (DB_SYNC === "true") {
  (async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Table synchronized successfully.");
    } catch (error) {
      console.error("Error synchronizing table:", error);
    }
  })();
}

module.exports = sequelize;
