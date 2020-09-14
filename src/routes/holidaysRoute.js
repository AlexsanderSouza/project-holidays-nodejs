// @ts-nocheck

const router = require('express-promise-router')()
const holidaysController = require('../controllers/holydaysController')

// Definindo as rotas de feriados (holidays)

/* Rota responsável por retornar o feriado */
router.get('/feriados/:code/:date', holidaysController.findHoliday)

/* Rota responsável por cadastrar e atualizar um feriado */
router.put('/feriados/:code/:dateOrName', holidaysController.updateHoliday)

/* Rota responsável por excluir um feriado */
router.delete('/feriados/:code/:dateOrName', holidaysController.deleteHoliday)

module.exports = router
