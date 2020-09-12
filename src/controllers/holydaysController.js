/* Método responsável por retornar um feriado caso exista */
exports.findHoliday = async (req, res) => {
  res.status(200).send(req.params)
}

/* Método responsável por atualizar um 'Feriado */
exports.updateHoliday = async (req, res) => {
  res.status(200).send({ message: 'holiday Updated Successfully!' })
}

/* Método responsável por excluir um feriado */
exports.deleteHoliday = async (req, res) => {
  res.status(200).send({ message: 'Product deleted successfully!', teste: 4 })
}
