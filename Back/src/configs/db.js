const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    `${process.env.POSTGRES_DB}`, 
    `${process.env.POSTGRES_USER}`, 
    `${process.env.POSTGRES_PASS}`, 
    {
        host: `${process.env.POSTGRES_HOST}`,
        port: process.env.POSTGRES_PORT,
        dialect: 'postgres',
        timezone: '-03:00',
        dialectOptions: {
            useUTC: false,
        },
        define: {
            timestamps: true,
            paranoid: true,     
            underscored: true,
        },
        pool: { 
            max: 5, 
            min: 0, 
            acquire: 30000, 
            idle: 10000 
        },
    }
);

module.exports = { sequelize };