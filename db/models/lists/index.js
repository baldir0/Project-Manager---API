module.exports = (sequelize, DataTypes, Mprojects) => {
  return sequelize.define('lists', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: Mprojects,
        key: 'id',
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  })
}
