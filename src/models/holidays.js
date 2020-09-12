module.exports = (sequelize, DataTypes) => {
  const holidays = sequelize.define(
    'holidays',
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM,
        values: ['default', 'move'],
      },
      year: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  )

  return holidays
}
