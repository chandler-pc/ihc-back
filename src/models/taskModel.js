const Task = (sequelize, DataTypes) => {
    return sequelize.define('Task', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expire: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      dificulty: {
        type: DataTypes.INTEGER,
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
  };
  
  export default Task;
  