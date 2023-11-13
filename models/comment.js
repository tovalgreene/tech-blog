const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model
class Comment extends Model {}

Comment.init({
    // Define fields and their data types
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1] // Ensure the comment is at least 1 character long
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user', // Reference to the 'user' model
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post', // Reference to the 'post' model
            key: 'id'
        }
    }
}, {
    sequelize, // Pass the connection instance
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use underscored instead of camelCasing
    modelName: 'comment' // Define the model name
});

module.exports = Comment; // Export the model
