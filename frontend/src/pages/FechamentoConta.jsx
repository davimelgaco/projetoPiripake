import React, { useState, useEffect } from 'react';

const ClosingPage = ({ eventId, onSubmit }) => {
    const [participants, setParticipants] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);

    // Fetch para buscar participantes e produtos da rota correta
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch para participantes
                const participantsResponse = await fetch('/participants'); // Substitua pela URL correta da API
                const participantsData = await participantsResponse.json();
                setParticipants(participantsData);

                // Fetch para produtos do evento (ou outra rota, conforme necessário)
                const productsResponse = await fetch(`/events/${eventId}/products`); // Substitua pela URL correta da API
                const productsData = await productsResponse.json();
                setProducts(productsData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [eventId]);

    // Função para marcar presença dos participantes
    const handlePresenceChange = (participantId, isPresent) => {
        if (isPresent) {
            const selectedParticipant = participants.find((p) => p._id === participantId);
            setSelectedParticipants((prev) => [
                ...prev,
                { ...selectedParticipant, consumptions: {} }, // Inicializa os consumos como objeto vazio
            ]);
        } else {
            setSelectedParticipants((prev) =>
                prev.filter((p) => p._id !== participantId)
            );
        }
    };

    // Função para selecionar produtos consumidos pelos participantes
    const handleProductSelection = (participantId, productId, quantity) => {
        setSelectedParticipants((prevParticipants) =>
            prevParticipants.map((participant) => {
                if (participant._id === participantId) {
                    // Atualiza o produto consumido por este participante
                    const updatedConsumptions = {
                        ...participant.consumptions,
                        [productId]: quantity, // Adiciona ou atualiza o consumo
                    };
                    return { ...participant, consumptions: updatedConsumptions };
                }
                return participant;
            })
        );
    };

    // Função para enviar os dados finais
    const handleSubmit = () => {
        const data = selectedParticipants.map((participant) => ({
            _id: participant._id,
            name: participant.name,
            consumptions: participant.consumptions, // Produtos consumidos por este participante
        }));
        onSubmit(data); // Envia para backend ou função final
    };

    return (
        <div>
            <h3>Fechamento da Conta</h3>
            <form>
                {participants.map((participant) => (
                    <div key={participant._id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedParticipants.some((p) => p._id === participant._id)}
                                onChange={(e) =>
                                    handlePresenceChange(participant._id, e.target.checked)
                                }
                            />
                            {participant.name}
                        </label>

                        {/* Seleção de produtos consumidos */}
                        {selectedParticipants.some((p) => p._id === participant._id) && (
                            <div>
                                {products.map((product) => (
                                    <div key={product._id}>
                                        <label>
                                            {product.name}
                                            <input
                                                type="number"
                                                placeholder="Quantidade consumida"
                                                onChange={(e) =>
                                                    handleProductSelection(
                                                        participant._id,
                                                        product._id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleSubmit}>
                    Salvar Fechamento
                </button>
            </form>
        </div>
    );
};

export default ClosingPage;
