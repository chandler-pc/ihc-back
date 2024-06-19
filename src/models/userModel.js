const User = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tablename: 'Users',
    });
};

export default User;
