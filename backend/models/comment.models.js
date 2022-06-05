module.exports = (sequelize, DataTypes) => {
    const Comment= sequelize.define("Comment",{
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
        userId: {
            type: DataTypes.INTEGER
        },
        postId: {
            type: DataTypes.INTEGER
        }
    })
    Comment.associate = function(models) {
        models.Comment.belongsTo(models.User, {
            onDelete: "cascade",
            foreignKey: { name: 'userId', allowNull: false }
        })
    };

    Comment.sync().then(() => {
        console.log("table and model synchro");
    }) . catch((err) =>{
        console.log("erreur");
    })
    return Comment
}