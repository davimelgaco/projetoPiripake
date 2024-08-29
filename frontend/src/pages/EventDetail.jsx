import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');

    useEffect(() => {
        // Buscar os detalhes do evento
        axios.get(`http://localhost:3001/events/${id}`)
            .then(response => {
                setEvent(response.data);
                setParticipants(response.data.participants); // Supondo que o evento tenha um campo 'participants'
            })
            .catch(error => console.error('Erro ao buscar evento:', error));
    }, [id]);

    const handleAddParticipant = () => {
        if (newParticipant) {
            const updatedParticipants = [...participants, { name: newParticipant, consumptions: [] }];
            setParticipants(updatedParticipants);
            setNewParticipant('');
            // Aqui você poderia enviar os dados atualizados ao backend
        }
    };

    const handleConsumptionChange = (participantIndex, newConsumption) => {
        const updatedParticipants = participants.map((participant, index) => {
            if (index === participantIndex) {
                return { ...participant, consumptions: [...participant.consumptions, newConsumption] };
            }
            return participant;
        });
        setParticipants(updatedParticipants);
        // Aqui você poderia enviar os dados atualizados ao backend
    };

    if (!event) return <div>Carregando...</div>;

    return (
        <div>
            <h2>Detalhes do Evento: {event.name}</h2>
            <p>Data: {new Date(event.date).toLocaleDateString()}</p>
            <p>Local: {event.location}</p>

            {/* Seção de Participantes */}
            <h3>Participantes</h3>
            <ul>
                {participants.map((participant, index) => (
                    <li key={index}>
                        {participant.name}
                        <ul>
                            {participant.consumptions.map((consumption, i) => (
                                <li key={i}>{consumption}</li>
                            ))}
                        </ul>
                        <button onClick={() => handleConsumptionChange(index, prompt('Adicione o consumo:'))}>
                            Adicionar Consumo
                        </button>
                    </li>
                ))}
            </ul>

            {/* Adicionar Novo Participante */}
            <div>
                <input
                    type="text"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    placeholder="Adicionar novo participante"
                />
                <button onClick={handleAddParticipant}>Adicionar Participante</button>
            </div>
        </div>
    );
};

export default EventDetail;
