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
    Post.sync().then(() => {
        console.log("table and model synchro");
    }) . catch((err) =>{
        console.log("erreur");
    })
    return Post
}