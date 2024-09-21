import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [products, setProducts] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');
    const [allParticipants, setAllParticipants] = useState([]); // Para armazenar todos os participantes existentes
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });

    // Funções para abrir e fechar o pop-up
    const [showPopup, setShowPopup] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const openParticipantPopup = (participant) => {
        setSelectedParticipant(participant);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

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

    const handleAddExistingParticipant = () => {
        if (newParticipant) {
            const existingParticipant = allParticipants.find(participant => participant.name === newParticipant);

            if (existingParticipant) {
                const updatedParticipants = [...participants, existingParticipant];
                setParticipants(updatedParticipants);

                // Atualizar o evento no backend com o novo participante
                axios.put(`http://localhost:5000/events/${id}/participants`, { participants: updatedParticipants })
                    .catch(error => console.error('Erro ao atualizar participantes no evento:', error));
            }

            setNewParticipant(''); // Limpar o campo de seleção
        }
    };

    const handleAddNewVisitor = () => {
        if (newParticipant) {
            axios.post(`http://localhost:5000/participants`, { name: newParticipant })
                .then(response => {
                    const createdParticipant = response.data;
                    const updatedParticipants = [...participants, createdParticipant];
                    setParticipants(updatedParticipants);

                    // Atualizar o evento no backend com o novo visitante
                    axios.put(`http://localhost:5000/events/${id}/participants`, { participants: updatedParticipants })
                        .catch(error => console.error('Erro ao atualizar participantes no evento:', error));
                })
                .catch(error => console.error('Erro ao criar participante:', error));

            setNewParticipant(''); // Limpar o campo de texto
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

    const handleConsumptionChange = (productIndex, participantIndex, newQuantity) => {
        const product = products[productIndex];
        const participantId = participants[participantIndex]._id;
        const updatedProducts = [...products];

        // Aqui você vai clonar os participantes para evitar mutação direta
        const updatedParticipants = [...participants];
        // Atualiza a quantidade do produto específico do participante específico
        const participant = updatedParticipants[participantIndex];
        // Usar o newQuantity passado como argumento
        participant.consumedProducts[productIndex].quantity = newQuantity;

        setParticipants(updatedParticipants);

        if (product.consumers.includes(participantId)) {
            product.consumers = product.consumers.filter(id => id !== participantId);
        } else {
            product.consumers.push(participantId);
        }

        setProducts(updatedProducts);

        // Enviar dados atualizados ao backend
        axios.put(`http://localhost:5000/events/${id}/products`, { products: updatedProducts })
            .catch(error => console.error('Erro ao atualizar consumo:', error));
    };

    // estado para armazenar os participantes que consumiram o produto
    const [consumers, setConsumers] = useState([]);
    const handleParticipantSelection = (e, participantId) => {
        if (e.target.checked) {
            setConsumers([...consumers, participantId]);  // Adiciona o participante selecionado
        } else {
            setConsumers(consumers.filter(id => id !== participantId));  // Remove se desmarcado
        }
    };

    if (!event) return <div>Carregando...</div>;

    return (
        <div>
            <h2>Detalhes do Evento: {event.name}</h2>
            <p>Data: {new Date(event.date).toLocaleDateString()}</p>
            <p>Local: {event.location}</p>

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

                {/* Seção para selecionar participantes que consumiram o produto */}
                <div>
                    <label>Escolha os participantes que consumiram:</label>
                    {participants.map((participant, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                value={participant._id}
                                onChange={(e) => handleParticipantSelection(e, participant._id)}
                            />
                            <span>{participant.name}</span>
                        </div>
                    ))}
                </div>

                <button onClick={handleAddProduct}>Adicionar Produto</button>
            </div>

            <section>
                {/* Seção de Participantes */}
                <h3>Participantes</h3>
                <ul>
                    {participants.map((participant, index) => (
                        <div key={index}>
                            <span>{participant.name}</span>
                            {/* Botão para ver o consumo do participante */}
                            <button onClick={() => openParticipantPopup(participant)}>Ver Consumo</button>
                        </div>
                    ))}

                    {/* Pop-up com detalhes do Consumo */}
                    {showPopup && (
                        <div className="popup">
                            <h3>Consumo de {selectedParticipant.name}</h3>
                            <ul>
                                {/* Lista dos produtos consumidos */}
                                {selectedParticipant.consumedProducts.map((product, productIndex) => (
                                    <li key={productIndex}>
                                        {product.name} - {product.quantity} - R${product.price}
                                        {/* Aqui, vamos implementar um input para modificar a quantidade consumida usando handleConsumptionChange */}
                                        <input
                                            type="number"
                                            placeholder="Alterar Quantidade"
                                            onChange={(e) => handleConsumptionChange(productIndex, participants.findIndex(p => p._id === selectedParticipant._id), e.target.value)}
                                            value={product.quantity}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <button onClick={closePopup}>Fechar</button>
                        </div>
                    )}
                </ul>

                {/* Dropdown para selecionar participantes existentes */}
                <div>
                    <select onChange={(e) => setNewParticipant(e.target.value)} value={newParticipant}>
                        <option value="">Selecione um participante existente</option>
                        {allParticipants.map((participant) => (
                            <option key={participant._id} value={participant.name}>
                                {participant.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddExistingParticipant}>Adicionar Participante Existente</button>
                </div>

                {/* Campo para adicionar visitantes */}
                <div>
                    <input
                        type="text"
                        value={newParticipant}
                        onChange={(e) => setNewParticipant(e.target.value)}
                        placeholder="Nome do novo visitante"
                    />
                    <button onClick={handleAddNewVisitor}>Adicionar Novo Visitante</button>
                </div>

                {/* Listar Consumo Atual */}
                <h2>Consumo Atual</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nome do Produto</th>
                            <th>Preço Unitário</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Aqui listamos todos os produtos adicionados */}
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{`R$${product.price}`}</td>
                                <td>{product.quantity}</td>
                                <td>{`R$${product.price * product.quantity}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
};

export default EventDetail;
