const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model
class Post extends Model {}

Post.init(
    {
        // Define fields and their data types
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // Reference to the 'user' model
                key: 'id'
            }
        }
    },
    {
        sequelize, // Pass the connection instance
        freezeTableName: true, // Prevent Sequelize from renaming the table
        underscored: true, // Use underscored instead of camelCasing
        modelName: 'post' // Define the model name
    }
);

module.exports = Post; // Export the model
