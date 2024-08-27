const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
    totalBill: { type: Number, default: 0 } // Adiciona o campo para o valor total da conta
});

module.exports = mongoose.model('Event', EventSchema);
