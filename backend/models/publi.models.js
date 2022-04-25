module.exports = (sequelize, DataTypes) => {
    const Post= sequelize.define("Post", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content:{
            type: DataTypes.STRING,
            allownull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        like: {
            type: DataTypes.INTEGER
        }
    })
    return Post
}