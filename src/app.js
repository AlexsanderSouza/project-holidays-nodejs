const express = require('express')
const cors = require('cors')

const app = express()

// ==> Rotas da API:
const index = require('./routes/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.json({ type: 'application/json' }))
app.use(cors())

app.use(index)

module.exports = app
