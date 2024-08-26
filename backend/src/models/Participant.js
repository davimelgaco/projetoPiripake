const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    arrivalTime: { type: Date, required: true },
    consumedItems: [{
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
    }]
});

module.exports = mongoose.model('Participant', ParticipantSchema);
