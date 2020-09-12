const models = require('../models')

/* Método responsável por retornar um feriado caso exista */
const findHoliday = async (req, res) => {
  try {
    /* valida a data */
    let valid = validateDate(req.params.date)
    /* caso a data não seja valida retorna erro 404 */
    if (valid) {
      /* busca o feriado */
      let data = await models.holidays.get({
        year: valid.year,
        month: valid.month,
        day: valid.day,
        code: 33,
      })
      /* verifica se existe  */
      return data ? res.status(200).send(data) : res.status(404).send()
    } else {
      res.status(404).send()
    }
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

/* Método responsável por atualizar um Feriado */
const updateHoliday = async (req, res) => {
  try {
    // holidays.create({ name: 'teste3', code: 'teste' })
    res.status(200).send({ message: 'holiday Updated Successfully!' })
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

/* Método responsável por excluir um feriado */
const deleteHoliday = async (req, res) => {
  try {
    res.status(200).send({ message: 'Product deleted successfully!', teste: 4 })
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

/**
 * verifica se é uma data valida
 * @param string date = data
 * return object
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
    date = { year: date[0], month: date[1], day: date[2] }
  } else if (date.length == 2) {
    valid = date[0].split('').length == 2 && date[1].split('').length == 2
    valid = valid && valiateDateMinMax(date[0], date[1])
    date = { year: null, month: date[0], day: date[1] }
  } else if (date.length == 1) {
    return 'teset'
  }
  return valid ? date : false
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

module.exports = {
  findHoliday,
  updateHoliday,
  deleteHoliday,
}
