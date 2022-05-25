module.exports = (sequelize, DataTypes) => {
    const Post= sequelize.define("Post", {
        
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        
        content:{
            type: DataTypes.STRING,
            allownull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        like: {
            type: DataTypes.INTEGER,
            default: 0
        }
    })

    Post.associate = function (models) {
        models.Post.belongsTo(models.User, {
            onDelete: "cascade",
            foreignKey: { name: 'userId', allowNull: false }
        });
        models.Post.hasMany(models.Comment, {
            foreignKey: 'postId'
        });
        models.Post.hasMany(models.Comment, {
            foreignKey: 'postId'
        });

    };
    Post.sync().then(() => {
        console.log("table and model synchro");
    }) . catch((err) =>{
        console.log(err);
    })
    return Post
}