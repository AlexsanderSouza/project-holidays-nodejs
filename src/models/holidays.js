module.exports = (sequelize, DataTypes) => {
  const Holidays = sequelize.define('holidays', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    type: DataTypes.ENUM,
    date: DataTypes.DATEONLY,
    timestamps: false,
  })

  return Holidays
}
