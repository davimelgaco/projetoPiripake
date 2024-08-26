const express = require('express');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const participantRoutes = require('./routes/participantRoutes');

app.use(express.json());

app.use('/events', eventRoutes);
app.use('/participants', participantRoutes);

module.exports = app;
