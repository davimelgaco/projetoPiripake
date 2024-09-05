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

// Atualizar a conta e a participação dos participantes
router.put('/calculate-bill', eventController.updateBillAndParticipants);

// Adicionar produto ao evento
router.post('/:eventId/products', eventController.addProductToEvent);

// Atualizar produto do evento
router.put('/:eventId/products/:productId', eventController.updateProductInEvent);

// Excluir produto do evento
router.delete('/:eventId/products/:productId', eventController.deleteProductFromEvent);

module.exports = router;
