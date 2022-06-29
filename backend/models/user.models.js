module.exports = (sequelize, DataTypes,) => {
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
            defaultValue: 'https://static.jobat.be/uploadedImages/grandprofilfb.jpg'
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
        admin:{
            type: DataTypes.BOOLEAN ,
            allowNull: false,
            defaultValue: 0
        }

    })
    User.associate = function (models) {
        models.User.hasMany(models.Post, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
    User.associate = function (models) {
        models.User.hasMany(models.Comment, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        })
    }
        
    };
    User.addScope('withoutPassword', {
        attributes: { exclude: ['password'] }
    });
    User.sync().then(() => {
        console.log("table and model synchro");
    }).catch((err) => {
        console.log("erreur");
    })

    
    return User

}




