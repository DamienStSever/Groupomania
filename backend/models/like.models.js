module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Publication',
                key: 'id'
            }
        },
        liked: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false,
            tableName: 'likes'
        }
    );

    Like.associate = function(models) {
        models.User.belongsToMany(models.Post, {
            through: models.Like,
            foreignKey: 'userId',
            otherKey: 'postId'
        });
        models.Post.belongsToMany(models.User, {
            through: models.Like,
            foreignKey: 'postId',
            otherKey: 'userId'
        });
        models.Like.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        models.Like.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post'
        })
    };

    return Like;
};