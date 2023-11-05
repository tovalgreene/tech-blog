const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const user = require('./user');
const post = require('./post');

class comment extends Model { }

comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: 'comment',
    }
);

comment.belongsTo(user, {
    foreignKey: 'user_id',
});

comment.belongsTo(post, {
    foreignKey: 'post_id',
});

module.exports = comment;