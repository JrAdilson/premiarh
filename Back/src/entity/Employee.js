module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 255]
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true,
            validate: {
                len: [11, 11],
                isNumeric: true
            }
        },
        shirt_size: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        shoe_size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 20,
                max: 50
            }
        },
    }, {
        tableName: 'employees',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
        indexes: [
            {
                unique: true,
                fields: ['email']
            },
            {
                unique: true,
                fields: ['cpf']
            }
        ]
    });

    return Employee;
};