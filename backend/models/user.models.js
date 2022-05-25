module.exports= (sequelize, DataTypes, ) =>{
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'http://localhost:4200/images/image_profil_default.jpg'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        },
        
    })
    User.associate = function (models) {
        models.User.hasMany(models.Post, {
            foreignKey: { name: 'userId',
                allowNull: false
            }
        });
    };
    User.addScope('withoutPassword', {
        attributes: { exclude: ['password'] }
    });
    User.sync().then(() => {
        console.log("table and model synchro");
    }) . catch((err) =>{
        console.log("erreur");
    })
    
     console.log(User === sequelize.models.User); 
     return User
     
}
 

    

