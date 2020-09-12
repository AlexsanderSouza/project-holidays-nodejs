const { QueryTypes } = require('sequelize')

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

  holidays.get = async function (param) {
    let data = await sequelize.query(
      `SELECT
        name
      FROM
        holidays
      WHERE
        (YEAR = ? OR YEAR IS NULL)
        AND MONTH = ?
        AND DAY = ?
        AND (code = '?'
        OR code = '0')
        ORDER BY YEAR asc
      LIMIT 1`,
      {
        replacements: [param.year, param.month, param.day, param.code],
        type: QueryTypes.SELECT,
      }
    )
    /* assumindo que não existe mais de um feriado em um unico dia */
    return data[0] ? data[0] : false
  }

  return holidays
}
