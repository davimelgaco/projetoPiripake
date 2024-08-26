const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.post('/participants', participantController.createParticipant);
router.get('/participants', participantController.getParticipants);
router.get('/participants/:id', participantController.getParticipantById);
router.put('/participants/:id', participantController.updateParticipant);
router.delete('/participants/:id', participantController.deleteParticipant);

module.exports = router;
