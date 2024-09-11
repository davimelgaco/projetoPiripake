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

        // Buscar todos os participantes já cadastrados
        axios.get(`http://localhost:5000/participants`)
            .then(response => {
                setAllParticipants(response.data);
            })
            .catch(error => console.error('Erro ao buscar participantes:', error));
    }, [id]);

    const handleAddParticipant = () => {
        if (newParticipant) {
            // Verificar se o participante já existe
            const existingParticipant = allParticipants.find(participant => participant.name === newParticipant);
            
            if (existingParticipant) {
                // Se o participante já existe, apenas o adiciona ao evento
                const updatedParticipants = [...participants, existingParticipant];
                setParticipants(updatedParticipants);
                // Atualizar o evento no backend com o novo participante
                axios.put(`http://localhost:5000/events/${id}`, { participants: updatedParticipants })
                    .catch(error => console.error('Erro ao atualizar participantes no evento:', error));
            } else {
                // Se o participante não existe, cria um novo com isFixed = false "Convidado"
                axios.post(`http://localhost:5000/participants`, { 
                    name: newParticipant,
                    isFixed: false
                })
                    .then(response => {
                        const createdParticipant = response.data;
                        const updatedParticipants = [...participants, createdParticipant];
                        setParticipants(updatedParticipants);
                        // Atualiza o evento com os novos participantes
                        axios.put(`http://localhost:5000/events/${id}`, { participants: updatedParticipants })
                            .catch(error => console.error('Erro ao atualizar participantes no evento:', error));
                    })
                    .catch(error => console.error('Erro ao criar participante:', error));
            }

            setNewParticipant('');
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

             {/* Dropdown para selecionar participantes existentes */}
            <div>
                <select onChange={(e) => setNewParticipant(e.target.value)} value={newParticipant}>
                    <option value="">Selecione um participante</option>
                    {allParticipants.map((participant) => (
                        <option key={participant._id} value={participant.name}>
                            {participant.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddParticipant}>Adicionar Participante</button>
            </div>

            {/* Campo para adicionar visitantes */}
            <div>
                <input
                    type="text"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    placeholder="Adicionar novo visitante"
                />
                <button onClick={handleAddParticipant}>Adicionar Visitante</button>
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
