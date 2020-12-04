const { Router } = require('express')

const ClienteController = 
    require('./controllers/ClienteController')

const routes = new Router();

routes.get('/cliente', ClienteController.index)
routes.get('/cliente/:id', ClienteController.show)
routes.post('/cliente', ClienteController.store)
routes.put('/cliente/:id', ClienteController.update)
routes.delete('/cliente/:id', ClienteController.delete)

module.exports = routes