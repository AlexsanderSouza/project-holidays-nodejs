const models = require('../models')

/* Método responsável por retornar um feriado caso exista */
const findHoliday = async (req, res) => {
  try {
    /* valida a data */
    let validDate = validateDate(req.params.date, false, true)
    let validCode = validateCode(req.params.code)
    /* caso a data não seja valida retorna erro 404 */
    if (validDate && validCode) {
      /* busca o feriado */
      let data = await models.holidays.get({
        year: validDate.year,
        month: validDate.month,
        day: validDate.day,
        code: validCode.code,
        codeLeft: validCode.codeLeft,
      })
      /* caso não retorne algum feriado, procura se tem feriados moveis */
      if (!data) {
        let dataHolidaysMove = await models.holidays.get(
          {
            year: null,
            month: null,
            day: null,
            code: validCode.code,
            codeLeft: validCode.codeLeft,
          },
          true,
          true
        )
        /* se tiver feriados moveis cadastrados, verifica se é feriado utilizando algoritmo de Meeus*/
        if (dataHolidaysMove) {
          let holidaysMoviment = holidaysMove(validDate.year)
          Object.keys(dataHolidaysMove).forEach((key) => {
            let date = `${validDate.year}-${validDate.month}-${validDate.day}`
            if (compareString(holidaysMoviment[date], dataHolidaysMove[key].name)) {
              data = dataHolidaysMove[key]
              return
            }
          })
        }
      }
      /* verifica se existe  */
      return data ? res.status(200).send(data) : res.status(404).send()
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

/* Método responsável por atualizar um Feriado */
const updateHoliday = async (req, res) => {
  try {
    /* valida a data */
    let validName = validateName(req.params.dateOrName, req.body)
    let validDate = validateDate(req.params.dateOrName, true)
    let validCode = validateCode(req.params.code)
    console.log(validName, validDate, validCode)
    /* caso não seja valido retorna erro 404 */
    if (validDate && validCode && validName) {
      let data = await models.holidays.createOrUpdate(
        {
          name: validName.name,
          month: validDate.month,
          day: validDate.day,
          code: validCode.code,
        },
        validName.move
      )
      if (data.create) {
        return res.status(201).send()
      }
      return res.status(200).send()
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

/* Método responsável por excluir um feriado */
const deleteHoliday = async (req, res) => {
  try {
    /* valida a data */
    let validName = validateName(req.params.dateOrName, req.body, true)
    let validDate = validateDate(req.params.dateOrName, true)
    let validCode = validateCode(req.params.code)
    /* caso não seja valido retorna erro 404 */
    if (validDate && validCode && validName) {
      /* busca o feriado */
      let dataGet = await models.holidays.get(
        {
          year: validDate.year,
          month: validDate.month,
          day: validDate.day,
          code: validCode.code,
          codeLeft: validCode.codeLeft,
          name: validName.name,
        },
        false,
        false,
        validName.move
      )
      /* verifica se o feriado existe e se pode excluir */
      if (dataGet && dataGet.code != '0' && (dataGet.code != validCode.codeLeft || dataGet.code == validCode.code)) {
        let dataDelete = await models.holidays.delete(
          {
            name: validName.name,
            month: validDate.month,
            day: validDate.day,
            code: validCode.code,
          },
          validName.move
        )
        if (dataDelete) return res.status(204).send()
        return res.status(404).send()
      } else if (dataGet) {
        return res.status(403).send()
      }
      return res.status(404).send()
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

/* função para comparar strings */
function compareString(str1, str2) {
  /* caso algum esteja indefinido, retorna false */
  if (typeof str1 == 'undefined' || typeof str2 == 'undefined') return false
  str1 = removeAccents(str1.toLowerCase().split(' ').join(''))
  str2 = removeAccents(str2.toLowerCase().split(' ').join(''))

  return str1 == str2
}

/* Função para remover acentos de uma string*/
function removeAccents(str) {
  var accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž-'
  var accentsOut = 'AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz'
  str = str.split('')
  var strLen = str.length
  var i, x
  for (i = 0; i < strLen; i++) {
    if ((x = accents.indexOf(str[i])) != -1) {
      str[i] = accentsOut[x]
    }
  }
  return str.join('')
}

/**
 * verifica se o nome do feriado é valido
 * @param string date
 * @param object body
 * @param boolean del
 * return object or false
 */
function validateName(date, body, del = false) {
  let isNumber = true
  let dateSplit = date.split('-')
  let name = ''
  /* verifica se é um numero */
  dateSplit.forEach((number) => {
    if (isNaN(parseInt(number))) isNumber = false
    name = name + ' ' + capitalize(number)
  })
  if (!isNumber) {
    return { name: name.trim(), move: true }
  } else if (typeof body.name != 'undefined' && body.name.trim() != '' && !del) {
    return { name: body.name.trim(), move: false }
  } else if (del) {
    return { name: name.trim(), move: false }
  }
  return false
}

/**
 * verifica se o o codigo é valido
 * @param string code
 * return object or false
 */
function validateCode(code) {
  let codeSplit = code.split('')
  let valid = true
  /* verifica se possui a quantidade de caracteres permitidas */
  if (codeSplit.length == 2 || codeSplit.length == 7) {
    /* verifica se é um numero */
    codeSplit.forEach((number) => {
      if (isNaN(parseInt(number))) valid = false
    })
    if (!valid) return false
    let codeSubstring = code.substring(0, 2)
    code = { codeLeft: codeSubstring, code: code }
    return code
  }
  return false
}

/**
 * verifica se é uma data valida
 * @param string date = data
 * @param boolean putOrdel = se a requisição é put ou delete
 * @param boolean get = se a requisição é get
 * return object or false
 */
function validateDate(date, putOrDel = false, get = false) {
  let valid = true
  let isNumber = true
  date = date.split('-')
  /* verifica se é um numero */
  date.forEach((number) => {
    if (isNaN(parseInt(number))) {
      if (putOrDel) {
        date = { year: null, month: null, day: null }
        valid = true
        isNumber = false
      } else {
        valid = false
      }
    }
  })
  /* se for invalido retorna false */
  if (!valid) return false
  valid = isNumber ? false : true
  /* valida para os casos de 2 e 3 digitos  */
  if (date.length == 3 && !putOrDel) {
    valid = date[0].split('').length == 4 && date[1].split('').length == 2 && date[2].split('').length == 2

    valid && validateDateMinMax(date[1], date[2])
    date = { year: date[0], month: date[1], day: date[2] }
  } else if (date.length == 2 && !get) {
    /* valida para os casos de 2 digitos  */
    valid = date[0].split('').length == 2 && date[1].split('').length == 2
    valid = valid && validateDateMinMax(date[0], date[1])
    date = { year: null, month: date[0], day: date[1] }
  }

  return valid ? date : false
}

/**
 *  verifica se o mês e dia estão de acordo com o permitido
 * @param interger month = mês
 * @param integer day = dia
 */
function validateDateMinMax(month, day) {
  month = parseInt(month)
  day = parseInt(day)
  let maxDay = maxDaysOfMonth(month)
  let valid = month > 0 && month < 13 && day <= maxDay && day > 0
  return valid
}

/**
 * retorna o maximo de dias de um determinado mês
 * @param integer month
 * return integer
 */
function maxDaysOfMonth(month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31
    case 4:
    case 6:
    case 9:
    case 11:
      return 30
    case 2:
      return 29
    default:
      return 0
  }
}

/* soma ou subtrai datas */
function daysSum(year, month, day, value) {
  let newDate = new Date(year, month - 1, day)
  newDate.setDate(newDate.getDate() + value)
  return new Date(newDate)
}

/**
 * calcula os feriados moveis
 * @param integer year
 * object
 */
function holidaysMove(year) {
  let a = year % 19
  let b = parseInt(year / 100)
  let c = year % 100
  let d = parseInt(b / 4)
  let e = b % 4
  let f = parseInt((b + 8) / 25)
  let g = parseInt((b - f + 1) / 3)
  let h = (19 * a + b - d - g + 15) % 30
  let i = parseInt(c / 4)
  let k = c % 4
  let L = (32 + 2 * e + 2 * i - h - k) % 7
  let m = parseInt((a + 11 * h + 22 * L) / 451)
  let month = parseInt((h + L - 7 * m + 114) / 31)
  let day = 1 + ((h + L - 7 * m + 114) % 31)

  /* o Date do javascript vai de 0 a 11 para meses */
  let pascoa = new Date(year, month - 1, day).toISOString().split('T')[0]

  let carnaval = daysSum(year, month, day, -47).toISOString().split('T')[0]

  let sextaSanta = daysSum(year, month, day, -2).toISOString().split('T')[0]

  let corpusChristi = daysSum(year, month, day, 60).toISOString().split('T')[0]

  return {
    [pascoa]: 'Páscoa',
    [carnaval]: 'Carnaval',
    [sextaSanta]: 'Sexta-Feira Santa',
    [corpusChristi]: 'Corpus Christi',
  }
}

/* coloca primeira letra de uma string em maiúscula */
const capitalize = (s) => {
  if (typeof s !== 'string') return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = {
  findHoliday,
  updateHoliday,
  deleteHoliday,
}
