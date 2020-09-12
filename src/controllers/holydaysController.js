const models = require('../models')

/* Método responsável por retornar um feriado caso exista */
exports.findHoliday = async (req, res) => {
  let valid = validateDate(req.params.date)
  /* caso a data não seja valida retorna erro 404 */
  if (valid) {
    // holidays.create({ name: 'teste3', code: 'teste' })
    models.holidays.findByPk(1).then((data) => {
      res.status(200).send(data.toJSON())
    })
  } else {
    res.status(404).send()
  }
}

/* Método responsável por atualizar um 'Feriado */
exports.updateHoliday = async (req, res) => {
  res.status(200).send({ message: 'holiday Updated Successfully!' })
}

/* Método responsável por excluir um feriado */
exports.deleteHoliday = async (req, res) => {
  res.status(200).send({ message: 'Product deleted successfully!', teste: 4 })
}

/**
 * verifica se é uma data valida
 * @param string date = data
 */
function validateDate(date) {
  let valid
  date = date.split('-')
  /* verifica se é um numero */
  date.forEach((number) => {
    if (!parseInt(number)) return false
  })
  /* valida para os casos de 2 e 3 digitos  */
  if (date.length == 3) {
    valid =
      date[0].split('').length == 4 &&
      date[1].split('').length == 2 &&
      date[2].split('').length == 2

    valid && valiateDateMinMax(date[1], date[2])
  } else if (date.length == 2) {
    valid = date[0].split('').length == 2 && date[1].split('').length == 2
    valid = valid && valiateDateMinMax(date[0], date[1])
  } else if (date.length == 1) {
    return 'teset'
  }
  return valid
}

/**
 *  verifica se o mês e dia estão de acordo com o permitido
 * @param interger month = mês
 * @param integer day = dia
 */
function valiateDateMinMax(month, day) {
  let valid = month > 0 && month < 13 && day < 32 && day > 0
  return valid
}
