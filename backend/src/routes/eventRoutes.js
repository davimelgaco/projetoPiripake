const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Criar um novo evento
router.post('/', eventController.createEvent);

// Obter todos os eventos
router.get('/', eventController.getEvents);

// Obter um evento por ID
router.get('/:id', eventController.getEventById);

// Atualizar um evento
router.put('/:id', eventController.updateEvent);

// Excluir um evento
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
