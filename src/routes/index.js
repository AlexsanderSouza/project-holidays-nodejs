const express = require('express')

const router = express.Router()

router.get('/feriados', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Seja bem-vindo(a) teste',
    version: '1.0.0',
  })
})

module.exports = router
