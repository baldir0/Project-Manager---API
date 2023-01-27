module.exports = (sequelize, DataTypes, Mlists, Mpriority) => {
  return sequelize.define('tasks', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: Mlists,
        key: 'id',
      }
    },
    priorityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mpriority,
        key: 'id',
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      maxStringLength: 255,
    },
    description: {
      type: DataTypes.STRING(1023),
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  })
}
