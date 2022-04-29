
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:')

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

        /* imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'http://localhost:3000/images/image_profil_default.jpg'
        }, */
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
       /*  description: {
            type: DataTypes.TEXT
        }, */

    })
    User.sync().then(() => {
        console.log("table and model synchro");
    }) . catch((err) =>{
        console.log("erreur");
    })
    console.log(User === sequelize.models.User);


    

