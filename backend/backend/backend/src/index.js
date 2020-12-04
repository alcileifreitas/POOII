const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb://localhost:27017/bdsi`,{
  useNewUrlParser: true
})

app.use(require('./routes'))

app.listen(3333, () => {
  console.log('Servidor rodando')
})

