import React from 'react';


const ParticipantList = ({ participants, openParticipantPopup }) => {
    return (
        <div>
            <h2>Lista de Participantes</h2>
            <ul>
                {participants.map(participant => (
                    <li key={participant._id}>
                        {participant.name}
                        <button onClick={() => openParticipantPopup(participant)}>Ver Consumo</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantList;


