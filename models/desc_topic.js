const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")
const Topic = require("./topic")
const Description = require("./description")


const Desc_topic = sequelize.define("desc_topic",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

Topic.belongsToMany(Description, {through: Desc_topic})
Description.belongsToMany(Topic, {through: Desc_topic})

Topic.hasMany(Desc_topic, {as: "desc_topic"})
Desc_topic.belongsTo(Topic, {as: "topic"})


Description.hasMany(Desc_topic,{as: "desc_topic"})
Desc_topic.belongsTo(Description, {as: "description"})

module.exports = Desc_topic