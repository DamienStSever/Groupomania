
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        liked: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    })
    Like.associate = function(models) {
        models.Like.belongsTo(models.User, {
            onDelete: "cascade",
            foreignKey: { name: 'userId', allowNull: false }
        });
        models.Like.belongsTo(models.Post, {
            onDelete: "cascade",
            foreignKey:{ name: "postId", allowNull: false}
        })
    };
    Like.sync().then(() => {
        console.log("table and model synchro");
    }).catch((err) => {
        console.log(err);
    })
    return Like
}

