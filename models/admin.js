const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")

const Admin = sequelize.define("admin", {
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
    phone: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    is_creator: DataTypes.BOOLEAN,
    refresh_token: DataTypes.STRING
},{
    timestamps: true,
    freezeTableName: true
})

module.exports = Admin