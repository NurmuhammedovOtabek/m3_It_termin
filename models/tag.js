const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")
const Topic = require("./topic")
const Category = require("./category")


const Tag = sequelize.define("tag",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

Topic.belongsToMany(Category, {through: Tag})
Category.belongsToMany(Topic, {through: Tag})

Topic.hasMany(Tag, {as: "tag"})
Tag.belongsTo(Topic, {as: "topic"})


Category.hasMany(Tag,{as: "tag"})
Tag.belongsTo(Category, {as: "category"})

module.exports = Tag