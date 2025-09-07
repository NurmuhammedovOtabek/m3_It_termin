const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")

const Dictionary = sequelize.define("dictionary",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    term: DataTypes.STRING,
    letter: DataTypes.STRING
},{
    freezeTableName: true,
    timestamps: true
})

module.exports = Dictionary