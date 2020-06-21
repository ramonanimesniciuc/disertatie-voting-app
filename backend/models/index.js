const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.project = require("../models/project.model")(sequelize, Sequelize);
db.status = require("../models/status.model")(sequelize, Sequelize);
db.categories = require("../models/category.model")(sequelize, Sequelize);
db.comments = require("../models/comment.model")(sequelize, Sequelize);
db.news= require("../models/news.model")(sequelize, Sequelize);
db.user_votes=require("../models/uservotes")(sequelize, Sequelize);
db.user_roles =require("../models/userrole.model")(sequelize, Sequelize);
db.rewards_user= require("../models/rewarduser.model")(sequelize, Sequelize);
db.rewards = require("../models/reward.model")(sequelize, Sequelize);
db.themes = require("../models/themes.model")(sequelize,Sequelize);
db.sponsors = require("./sponsor.model")(sequelize,Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.sponsors.hasMany(db.themes);
db.themes.belongsTo(db.sponsors);
db.rewards.belongsToMany(db.user, {
    through: "rewards_user",
    foreignKey: "rewardId",
    otherKey: "userId"
});
db.user.belongsToMany(db.rewards, {
    through: "rewards_user",
    foreignKey: "userId",
    otherKey: "rewardId"
});
db.project.belongsToMany(db.user, {
    through: "user_votes",
    foreignKey: "projectId",
    otherKey: "userId"
});
db.user.belongsToMany(db.project, {
    through: "user_votes",
    foreignKey: "userId",
    otherKey: "projectId"
});

db.user.hasMany(db.project);
db.project.belongsTo(db.user);


db.user.hasMany(db.project);
db.project.belongsTo(db.user);

db.user.hasMany(db.comments);
db.comments.belongsTo(db.user);

db.project.belongsTo(db.categories);
db.categories.hasMany(db.project);

db.project.hasMany(db.comments);
db.comments.belongsTo(db.project);

db.status.hasMany(db.project);
db.project.belongsTo(db.status);


db.ROLES = ["user", "admin", "moderator" ,"sponsor"];

module.exports = db;
