const mongoose = require('mongoose');
const Participant = require('../models/Participant');

// Conectar ao banco de dados
mongoose.connect('mongodb://mongo:27017/projetoPiripake', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const initializeParticipants = async () => {
    try {
        // Adicionar participantes fixos
        const fixedParticipants = [
            { name: 'Davi', isFixed: true },
            { name: 'Marcos', isFixed: true },
            { name: 'Lucas Esdras', isFixed: true },
            { name: 'Lucas Junio', isFixed: true },
            { name: 'Ramon', isFixed: true },
            { name: 'David', isFixed: true },
            { name: 'Bruno', isFixed: true },
            { name: 'Gabriel', isFixed: true },
            { name: 'Lucas Pezão', isFixed: true },
            { name: 'Carlitos', isFixed: true },
            { name: 'Helder', isFixed: true }
        ];
        await Participant.insertMany(fixedParticipants);
        console.log('Participantes fixos adicionados com sucesso.');
    } catch (error) {
        console.error('Erro ao adicionar participantes:', error);
    } finally {
        mongoose.disconnect();
    }
};

initializeParticipants();
