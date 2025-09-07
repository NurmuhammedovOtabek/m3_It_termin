const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")


const Category = sequelize.define("category",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING,
        unique: true
    },
    parent_category_id: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: true
})

Category.hasMany(Category, {
    as: "children", 
    foreignKey: "parent_category_id"
});
  
Category.belongsTo(Category, {
    as: "parent", 
    foreignKey: "parent_category_id"
});


module.exports = Category