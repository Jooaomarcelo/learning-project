const express = require('express');
const tasksController = require('./controllers/tasksController'); // Controlador das tarefas
const tasksMiddleware = require('./middlewares/tasksMiddleware'); // Agente entre o controlador para validação dos inputs

const router = express.Router();

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateTitle, tasksController.addTask);

// Nas próximas rotas pegamos o "id" dos parâmetros da URL e guardamos esse valor na variável id
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksMiddleware.validateTitle, tasksMiddleware.validateStatus, tasksController.updateTask);

module.exports = router;