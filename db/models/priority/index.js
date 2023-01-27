module.exports = (sequelize, DataTypes) => {
  return sequelize.define('priority', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(127),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1023),
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  })
}
