const { sequelize } = require('../configs/db');
const { DataTypes } = require('sequelize');

const Participant = require('./Participant')(sequelize, DataTypes);

const syncDatabase = async () => {
    await sequelize.sync({ alter: true });
};

module.exports = { sequelize, Participant, syncDatabase };