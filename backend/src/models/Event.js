const mongoose = require('mongoose');

// Subesquema para os produtos consumidos
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    consumers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }] // Lista de IDs dos participantes que consumiram o produto
});

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
    products: [ProductSchema], // Lista de produtos consumidos durante o evento
    totalBill: { type: Number, default: 0 } // Valor total da conta do evento
});

module.exports = mongoose.model('Event', EventSchema);
