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

//Atualizar o consumo de um participante em um evento
router.put('/:id/consumptions', eventController.updateConsumption);

// Adicionar um novo produto a um evento
router.post('/:id/products', eventController.addProduct);  

// Atualizar um produto em um evento
router.put('/:eventId/products/:productId', eventController.updateProduct);

// Atualizar participantes de um evento
router.put('/:id/participants', eventController.updateParticipants);

// Rota para buscar produtos e participantes
router.get('/:id', eventController.getEventData);

// Rota para salvar os consumos dos participantes
router.post('/:id/fechamento', eventController.saveConsumptions);

module.exports = router;
 