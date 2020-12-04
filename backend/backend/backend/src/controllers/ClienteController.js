const Cliente = require('../models/Cliente')

module.exports = {

  async index(req, res) {
    const { page = 1 } = req.query;
    const cliente = await Cliente.paginate({}, { page , limit: 10});
    return res.json(cliente)
  },

  async show(req, res) {
    const { id } = req.params;
    const cliente = await Cliente.findById(id)
    return res.json(cliente)
  },

  async store(req, res) {
    const cliente = await Cliente.create(req.body)
    return res.json(cliente)
  },

  async update(req, res) {
    const { id } = req.params
    const cliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true })
    return res.json(cliente)
  },

  async delete(req, res) {
    const { id } = req.params
    await Cliente.findByIdAndRemove(id)
    return res.send()
  },
  
}