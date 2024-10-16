const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define('Task', {
    task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    task_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = Task;
