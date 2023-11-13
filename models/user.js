const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Create the User model with methods and hooks
class User extends Model {
    // Method to check password validity
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Define table columns and configuration for User model
User.init(
    {
        // ID column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        // Password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [4] } // Minimum length of 4 characters
        }
    },
    {
        hooks: {
            // Hash password before User creation
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Hash password before User update
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User; // Export the User model
