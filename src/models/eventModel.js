const Event = (sequelize, DataTypes) => {
    return sequelize.define('Event', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        allDay: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
    });
}

export default Event;