const sequelize = require("../config/db");
const  {DataTypes} = require("sequelize")

const Social = sequelize.define("social",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    spcial_name: {
        type: DataTypes.STRING,
        unique: true
    },
    spcial_icon_file: DataTypes.STRING
},{
    freezeTableName: true,
    timestamps: true
})

module.exports = Social