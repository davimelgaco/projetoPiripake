const Event = require('../models/Event');
const Participant = require('../models/Participant');

// Criar um novo evento
exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Obter todos os eventos
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('participants');
        res.send(events);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Obter um evento por ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('participants');
        if (!event) return res.status(404).send('Evento não encontrado');
        res.send(event);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Atualizar um evento
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!event) return res.status(404).send('Evento não encontrado');
        res.send(event);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Excluir um evento
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).send('Evento não encontrado');
        res.send('Evento excluído com sucesso');
    } catch (err) {
        res.status(500).send(err);
    }
};

// Atualizar a conta total e calcular a participação individual
exports.updateBillAndParticipants = async (req, res) => {
    try {
        const { eventId, totalBill, participantShares } = req.body;

        // Atualiza a conta total do evento
        const event = await Event.findByIdAndUpdate(eventId, { totalBill }, { new: true });

        if (!event) return res.status(404).send('Evento não encontrado');

        // Atualiza a participação de cada participante
        for (const { participantId, share } of participantShares) {
            await Participant.findByIdAndUpdate(participantId, { individualShare: share });
        }

        res.send(event);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateConsumption = async (req, res) => {
    try {
        const { id } = req.params; // ID do evento
        const { participantId, consumption } = req.body; // ID do participante e novo consumo

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Evento não encontrado' });

        // Encontre o participante dentro do evento e adicione o novo consumo
        const participant = event.participants.id(participantId);
        if (!participant) return res.status(404).json({ message: 'Participante não encontrado' });

        participant.consumptions.push(consumption); // Adicione o novo consumo
        await event.save();

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar consumo', error });
    }
};

