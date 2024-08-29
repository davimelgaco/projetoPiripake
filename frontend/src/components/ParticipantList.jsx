import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParticipantList = () => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.get('http://localhost:3001/participants');
                setParticipants(response.data);
            } catch (error) {
                console.error('Erro ao buscar participantes:', error);
            }
        };

        fetchParticipants();
    }, []);

    return (
        <div>
            <h2>Lista de Participantes</h2>
            <ul>
                {participants.map(participant => (
                    <li key={participant._id}>{participant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantList;
