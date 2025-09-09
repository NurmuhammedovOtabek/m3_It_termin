const sequelize = require ("../config/db")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    info: {
        type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    refresh_token: DataTypes.STRING
},{
    timestamps: true,
    freezeTableName: true
})

module.exports = User