import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ParticipantList() {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.get('http://localhost:5000/participants');
                setParticipants(response.data);
            } catch (error) {
                setError('Erro ao buscar participantes.');
                console.error('Erro ao buscar participantes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="participants-list">
            <h2>MEMBROS DO PIRIPAKE</h2>
            <ul>
                {participants.length === 0 ? (
                    <li>Sem membros disponíveis.</li>
                ) : (
                    participants.map(participants => (
                        <li key={participants._id}>
                            <h3>{participants.name}</h3>
                            <p>Nome: {participants.name}</p>
                            <p>Quando sua liberdade cantou?: {participants.groupEntry}</p>
                            <Link to={`/participants/${participants._id}`}>Ver Detalhes</Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default ParticipantList;
