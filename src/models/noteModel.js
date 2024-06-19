const Note = (sequelize, DataTypes) => {
    return sequelize.define('Note', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      names: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      descriptions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
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
  
  export default Note;
  