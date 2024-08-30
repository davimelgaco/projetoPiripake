const mongoose = require('mongoose');
const Participant = require('../models/Participant');

// Conectar ao banco de dados
mongoose.connect('mongodb://localhost:27017/projetoPiripake', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const updateParticipants = async () => {
    try {
        // Adicionar ou atualizar participantes fixos
        const fixedParticipants = [
            'Davi',
            'Marcos',
            'Lucas Esdras',
            'Lucas Junio',
            'Ramon',
            'David',
            'Bruno',
            'Gabriel',
            'Lucas Pezão',
            'Carlitos',
            'Helder'
        ];

        // Atualizar cada participante com o campo isFixed: true
        for (const name of fixedParticipants) {
            await Participant.updateOne(
                { name: name }, // Filtro para encontrar o participante
                { $set: { isFixed: true } }, // Atualização do campo
                { upsert: false } // Não inserir se não encontrado
            );
        }
        console.log('Participantes atualizados com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar participantes:', error);
    } finally {
        mongoose.disconnect();
    }
};

updateParticipants();
