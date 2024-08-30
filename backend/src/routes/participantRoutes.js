const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

// Criar um novo participante
router.post('/', participantController.createParticipant);

// Obter todos os participantes
router.get('/', participantController.getAllParticipants);

// Obter um participante por ID
router.get('/:id', participantController.getParticipantById);

// Atualizar um participante
router.put('/:id', participantController.updateParticipant);

// Excluir um participante
router.delete('/:id', participantController.deleteParticipant);

// Obter participantes fixos
router.get('/fixed', participantController.getFixedParticipants);

module.exports = router;
