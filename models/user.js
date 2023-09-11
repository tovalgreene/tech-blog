const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class user extends Model { }

user.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);
user.hasMany(post, {
    foreignKey: 'user_id',
});

user.hasMany(comment, {
    foreignKey: 'user_id',
});

module.exports = user;