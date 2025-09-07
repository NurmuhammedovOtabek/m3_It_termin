const sequelize = require("../config/db")
const {DataTypes, DATE} = require("sequelize");
const Author = require("./author");


const Topic = sequelize.define("topik", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: DataTypes.INTEGER,
    topic_title: {
        type: DataTypes.STRING,
        unique: true
    },
    topic_tect: DataTypes.TEXT,
    is_checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_approved:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    expert_id: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: true
})

Topic.belongsTo(Author, {foreignKey: "author_id", as: "author"});
Author.hasMany(Topic, { foreignKey: "author_id", as: "writtenTopics"});
  
Topic.belongsTo(Author, { foreignKey: "expert_id", as: "expert"});
Author.hasMany(Topic, {foreignKey: "expert_id", as: "expertisedTopics"});
  

module.exports = Topic
  
