module.exports = (sequelize, DataTypes) => {

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
            allowNull: false,
            defaultValue: 'http://localhost:3000/images/image_profil_default.jpg'
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
            type: DataTypes.TEXT
        },

    })
    return User
    
}




