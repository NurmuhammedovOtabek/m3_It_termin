const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")
const Dictionary = require("./dictionary")
const Description = require("./description")

const Synonym = sequelize.define("synonym",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

Dictionary.belongsToMany(Description, {through: Synonym})
Description.belongsToMany(Dictionary, {through: Synonym})

Dictionary.hasMany(Synonym, {as: "synonym"})
Synonym.belongsTo(Dictionary, {as: "dictionary"})


Description.hasMany(Synonym,{as: "synonym"})
Synonym.belongsTo(Description, {as: "description"})

module.exports = Synonym