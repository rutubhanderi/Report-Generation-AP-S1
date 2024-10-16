const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Volunteer = sequelize.define('Volunteer', {
    volunteer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    join_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Volunteer;
