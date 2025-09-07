const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")
const Category = require("./category")

const Description = sequelize.define("description",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: true
})

Category.hasMany(Description, {as: "description", foreignKey: "category_id"})
Description.belongsTo(Category, {as:"category", foreignKey: "category_id"})

module.exports = Description