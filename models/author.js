const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")

const Author =  sequelize.define("auth",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    frist_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    nick_name:{
        type: DataTypes.STRING,
        unique: true
    },
    email: DataTypes.STRING(50),
    phone: DataTypes.STRING(15),
    password: DataTypes.STRING,
    info: DataTypes.TEXT,
    position: DataTypes.STRING,
    photo: DataTypes.STRING,
    is_expert: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    refresh_token: DataTypes.STRING
},{
    freezeTableName: true,
    timestamps: true
})

module.exports = Author