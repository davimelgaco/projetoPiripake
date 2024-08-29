import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/events');
                setEvents(response.data);
            } catch (error) {
                setError('Erro ao buscar eventos.');
                console.error('Erro ao buscar eventos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="event-list">
            <h2>Eventos Iniciados</h2>
            <ul>
                {events.length === 0 ? (
                    <li>Sem eventos disponíveis.</li>
                ) : (
                    events.map(event => (
                        <li key={event._id}>
                            <h3>{event.name}</h3>
                            <p>Data: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Local: {event.location}</p>
                            <Link to={`/events/${event._id}`}>Ver Detalhes</Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default EventList;
