const express = require('express');
const router = express.Router();

// Importar rotas
const eventRoutes = require('./eventRoutes');
const participantRoutes = require('./participantRoutes');

// Usar rotas
router.use('/events', eventRoutes);
router.use('/participants', participantRoutes);

module.exports = router;
