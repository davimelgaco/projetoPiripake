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

// Adicionar produto ao evento
exports.addProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    try {
        // Encontre o evento pelo ID
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        // Adicionar o novo produto ao evento
        const newProduct = { name, price, quantity, consumers: [] };
        event.products.push(newProduct);  // Certifique-se de que `products` está definido no modelo de evento

        // Salvar as alterações
        await event.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar produto ao evento' });
    }
};

    exports.updateProduct = async (req, res) => {
    const { eventId, productId } = req.params;
    const updatedData = req.body;

    try {
        // Encontre o evento e o produto que você deseja atualizar
        const event = await Event.findById(eventId);
        const productIndex = event.products.findIndex(product => product._id.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Atualizar o produto com os novos dados
        event.products[productIndex] = { ...event.products[productIndex], ...updatedData };
        
        // Salvar as alterações
        await event.save();

        res.status(200).json(event.products[productIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
};

// Exemplo de implementação no eventController
exports.updateParticipants = async (req, res) => {
    const { id } = req.params;
    const { participants } = req.body; // Recebe a nova lista de participantes

    try {
        // Atualize o evento no banco de dados
        const event = await Event.findByIdAndUpdate(id, { participants }, { new: true });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar participantes', error });
    }
};

