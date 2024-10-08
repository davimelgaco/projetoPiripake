const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isFixed: { type: Boolean, default: false }, // Adiciona o campo isFixed
    arrivalTime: { type: Date },
    groupEntry: {type: Date},
    consumptions: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],    individualShare: { type: Number, default: 0 } // Adiciona o campo para a parte individual da conta
});

module.exports = mongoose.model('Participant', ParticipantSchema);
 