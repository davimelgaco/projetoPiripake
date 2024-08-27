import React, { useState } from 'react';
import axios from 'axios';

function EventForm() {
    const [event, setEvent] = useState({
        name: '',
        date: '',
        location: '',
        participants: []
    });

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/events', event);
            alert('Evento criado com sucesso!');
        } catch (error) {
            alert('Erro ao criar evento.');
        }
    };

    return (
        <div className="event-form">
            <h2>Criar Novo Evento</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome do Bar:
                    <input type="text" name="name" value={event.name} onChange={handleChange} required />
                </label>
                <label>
                    Data do Evento:
                    <input type="date" name="date" value={event.date} onChange={handleChange} required />
                </label>
                <label>
                    Local do Evento:
                    <input type="text" name="location" value={event.location} onChange={handleChange} required />
                </label>
                <button type="submit">Criar Evento</button>
            </form>
        </div>
    );
}

export default EventForm;
