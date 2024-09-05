import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [products, setProducts] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });

    useEffect(() => {
        // Buscar os detalhes do evento
        axios.get(`http://localhost:5000/events/${id}`)
            .then(response => {
                setEvent(response.data);
                setParticipants(response.data.participants);
                setProducts(response.data.products);
            })
            .catch(error => console.error('Erro ao buscar evento:', error));
    }, [id]);

    const handleAddParticipant = () => {
        if (newParticipant) {
            const updatedParticipants = [...participants, { name: newParticipant, consumptions: [] }];
            setParticipants(updatedParticipants);
            setNewParticipant('');
            // Enviar dados atualizados ao backend
            axios.put(`http://localhost:5000/events/${id}`, { participants: updatedParticipants })
                .catch(error => console.error('Erro ao adicionar participante:', error));
        }
    };

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price && newProduct.quantity) {
            const updatedProducts = [...products, { ...newProduct, consumers: [] }];
            setProducts(updatedProducts);
            setNewProduct({ name: '', price: '', quantity: '' });
            // Enviar dados atualizados ao backend
            axios.post(`http://localhost:5000/events/${id}/products`, newProduct)
                .catch(error => console.error('Erro ao adicionar produto:', error));
        }
    };

    const handleConsumptionChange = (productIndex, participantIndex) => {
        const product = products[productIndex];
        const participantId = participants[participantIndex]._id;
        const updatedProducts = products.map((prod, index) => {
            if (index === productIndex) {
                return {
                    ...prod,
                    consumers: [...prod.consumers, participantId]
                };
            }
            return prod;
        });

        setProducts(updatedProducts);
        // Enviar dados atualizados ao backend
        axios.put(`http://localhost:5000/events/${id}`, { products: updatedProducts })
            .catch(error => console.error('Erro ao atualizar consumo:', error));
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
                            {products.map((product, i) => (
                                <li key={i}>
                                    {product.name} - R${product.price} - Quantidade: {product.quantity}
                                    <button onClick={() => handleConsumptionChange(i, index)}>
                                        Marcar Consumo
                                    </button>
                                </li>
                            ))}
                        </ul>
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

            {/* Adicionar Novo Produto */}
            <div>
                <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Nome do Produto"
                />
                <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Preço"
                />
                <input
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    placeholder="Quantidade"
                />
                <button onClick={handleAddProduct}>Adicionar Produto</button>
            </div>
        </div>
    );
};

export default EventDetail;
