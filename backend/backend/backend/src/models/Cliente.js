const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const ClienteSchema = new mongoose.Schema({
  nome: String,
  email: String,
  cpf: String,
}, {
  timestamps: true
})

ClienteSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("Cliente", ClienteSchema)

