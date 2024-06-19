const UserDetails = (sequelize, DataTypes) => {
    return sequelize.define('UserDetails', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        university: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'User_details',
    });
};

export default UserDetails;
