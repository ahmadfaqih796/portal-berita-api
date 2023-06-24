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

const setupDatabase = (app) => {
  const connectionString = app.get("mysql");
  const sequelize = new Sequelize(
    "mysql://root:@localhost/db_berita",
    sequelizeConfig
  );

  const oldSetup = app.setup;

  app.set("sequelizeClient", sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach((name) => {
      if ("associate" in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    if (DB_SYNC === "true") {
      try {
        app.set(
          "sequelizeSync",
          sequelize.sync({ alter: true, logging: console.log })
        );
        console.log("Database synchronized successfully.");
      } catch (error) {
        console.log("Error synchronizing database:", error);
      }
    }

    return result;
  };
};

module.exports = setupDatabase;
