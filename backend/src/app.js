const express = require('express');
const cors = require('cors');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const participantRoutes = require('./routes/participantRoutes');

// Configura o CORS para permitir requisições do frontend
app.use(cors({
    origin: 'http://localhost:3000', // Permite requisições do frontend na porta 3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));


app.use(express.json());

app.use('/events', eventRoutes);
app.use('/participants', participantRoutes);

module.exports = app;
