const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class post extends Model { }

post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

post.belongsTo(user, {
    foreignKey: 'user_id'
});

post.hasMany(comment, {
    foreignKey: 'post_id',
});

module.exports = post;