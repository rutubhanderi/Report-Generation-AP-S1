const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Report = sequelize.define('Report', {
    report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    volunteer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Volunteers',
            key: 'volunteer_id',
        },
    },
    report_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tasks_completed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tasks_pending: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_hours_worked: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    performance_rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = Report;
