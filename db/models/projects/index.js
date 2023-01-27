module.exports = (sequelize, DataTypes) => {
  return sequelize.define('projects', {
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
      allowNull: false,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  })
}
