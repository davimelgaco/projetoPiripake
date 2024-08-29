const Participant = require('../models/Participant');

// Criar um novo participante
exports.createParticipant = async (req, res) => {
    try {
        const participant = new Participant(req.body);
        await participant.save();
        res.status(201).send(participant);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Obter todos os participantes
exports.getParticipants = async (req, res) => {
    try {
        const participants = await Participant.find();
        res.send(participants);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Obter um participante por ID
exports.getParticipantById = async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id);
        if (!participant) return res.status(404).send('Participante não encontrado');
        res.send(participant);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Atualizar um participante
exports.updateParticipant = async (req, res) => {
    try {
        const participant = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!participant) return res.status(404).send('Participante não encontrado');
        res.send(participant);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Excluir um participante
exports.deleteParticipant = async (req, res) => {
    try {
        const participant = await Participant.findByIdAndDelete(req.params.id);
        if (!participant) return res.status(404).send('Participante não encontrado');
        res.send('Participante excluído com sucesso');
    } catch (err) {
        res.status(500).send(err);
    }
};

//Retorna os participantes fixos disponíveis

exports.getFixedParticipants = async (req, res) => {
    try {
        const participants = await Participant.find({ isFixed: true });
        res.json(participants);
    } catch (error) {
        res.status(500).send('Erro ao buscar participantes fixos.');
    }
};
