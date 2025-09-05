const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")
const Author = require("./author")
const Social = require("./social")

const Author_social = sequelize.define("author_social",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    social_link: DataTypes.STRING
},{
    freezeTableName: true,
    timestamps: true
})

Author.belongsToMany(Social, {through: Author_social})
Social.belongsToMany(Author, {through: Author_social})

Author.hasMany(Author_social, {as: "author_social"})
Author_social.belongsTo(Author, {as: "author"})

Social.hasMany(Author_social, {as: "asuthor_social"})
Author_social.belongsTo(Social, {as: "social"})

module.exports = Author_social