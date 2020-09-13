const { QueryTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const holidays = sequelize.define(
    'holidays',
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      year: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  )

  /* busca um feriado */
  holidays.get = async function (param, nationalPriority = true, holidaysMove = false) {
    let orderBy = nationalPriority ? 'ORDER BY YEAR asc' : 'ORDER BY code asc'
    let select = nationalPriority ? 'name' : 'name, code'
    let isNull = param.day == null ? 'IS' : '='
    let query = `SELECT
                    ${select}
                  FROM
                    holidays
                  WHERE
                    (YEAR ${isNull} ? OR YEAR IS NULL)
                    AND MONTH ${isNull} ?
                    AND DAY ${isNull} ?
                    AND (code = ?
                    OR code = ?
                    OR code = '0')
                    ${orderBy}`
    let replacements = [param.year, param.month, param.day, param.code, param.codeLeft]

    /* realiza a consulta */
    let data = await sequelize.query(query, {
      replacements: replacements,
      type: QueryTypes.SELECT,
    })
    /* assumindo que não existe mais de um feriado em um unico dia */
    return holidaysMove ? data : data[0] ? data[0] : false
  }

  /* cria ou atualiza um feriado */
  holidays.createOrUpdate = async function (param, holidayMove = false) {
    let condition = {}
    /* verifica se é um feriado movel */
    if (holidayMove) {
      condition = { name: param.name, month: null, day: null, code: param.code }
    } else {
      condition = { month: param.month, day: param.day, code: param.code }
    }
    return holidays.findOne({ where: condition }).then(function (obj) {
      // caso exista atualiza feriado
      if (obj) {
        let objUpated = obj.update(param)
        return { obj: objUpated, create: false }
      } else {
        // caso não exista, cria o feriado
        let objCreated = holidays.create(param)
        return { obj: objCreated, create: true }
      }
    })
  }

  /* cria ou atualiza um feriado */
  holidays.delete = async function (param, holidayMove = false) {
    let condition = {}
    /* verifica se é um feriado movel */
    if (holidayMove) {
      condition = { name: param.name, month: null, day: null, code: param.code }
    } else {
      condition = { month: param.month, day: param.day, code: param.code }
    }
    /* remove o feriado */
    return holidays.destroy({ where: condition }).then(function (rowDeleted) {
      /* se tudo der certo, retorna true */
      return rowDeleted === 1
    })
  }

  return holidays
}
