const mongoose = require('mongoose');

// Subesquema para os produtos consumidos
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }, // Quantidade do produto
    consumers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }] // Participantes que consumiram o produto
});

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
    products: [ProductSchema] // Produtos consumidos durante o evento
});

// Função para calcular o valor total da conta
EventSchema.methods.calculateTotalBill = function () {
    return this.products.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
};

module.exports = mongoose.model('Event', EventSchema);
