const { sequelize } = require('../configs/db');
const { DataTypes } = require('sequelize');

const Employee = require('./Employee')(sequelize, DataTypes);

const syncDatabase = async () => {
    await sequelize.sync({ alter: true });
};

module.exports = { sequelize, Employee, syncDatabase };