import React, { useState, useEffect } from 'react';
import membros from '../apagar/listaDeMembros';

const ClosingPage = ({ eventId, onSubmit }) => {
    const [participants, setParticipants] = useState(membros); // Estado para armazenar os participantes
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos (ainda não utilizado)
    const [selectedParticipants, setSelectedParticipants] = useState([]); // Estado para armazenar participantes selecionados
    const [newVisitorName, setNewVisitorName] = useState(''); // Estado para o nome do visitante


    // Fetch para buscar participantes e produtos da rota correta
    useEffect(() => {
        const fetchData = async () => {
            try {

                /* Consulta de participantes no banco 
                // Fetch para participantes
                const participantsResponse = await fetch('/participants'); // Substitua pela URL correta da API
                const participantsData = await participantsResponse.json();
                setParticipants(participantsData); */

                // Fetch para produtos do evento (se necessário, pode ser removido se não estiver em uso)
                const productsResponse = await fetch(`/events/${eventId}/products`); // Chama a rota que retorna os produtos
                const productsData = await productsResponse.json(); // Converte a resposta para JSON
                setProducts(productsData); // Atualiza o estado com os dados dos produtos
            } catch (error) {
                console.error('Erro ao buscar dados:', error); // Loga erro no console, se ocorrer
            }
        };

        fetchData(); // Executa a função fetchData ao carregar o componente
    }, [eventId]); // Dependência para refazer o fetch se eventId mudar

    const handlePresenceChange = (participantId, isPresent) => {
        const selectedParticipant = participants.find((p) => p._id === participantId);
        setSelectedParticipants((prev) => {
            if (isPresent) {
                // Adiciona o participante à lista, se ele não estiver presente
                return [
                    ...prev,
                    { ...selectedParticipant, consumptions: {} }, // Inicializa os consumos como objeto vazio
                ];
            } else {
                // Remove o participante da lista, se ele estiver presente
                return prev.filter((p) => p._id !== participantId);
            }
        });
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
                return participant; // Retorna participante inalterado
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
        onSubmit(data); // Envia os dados para a função final
    };

     // Função para adicionar um visitante ao evento
     const handleAddVisitor = () => {
        if (newVisitorName.trim()) {
            const newVisitor = {
                _id: `visitor-${Date.now()}`, // Gera um ID único temporário
                name: newVisitorName,
                consumptions: {}, // Inicializa consumos como um objeto vazio
            };
            setSelectedParticipants((prev) => [...prev, newVisitor]); // Adiciona o visitante à lista de selecionados
            participants.push(newVisitor); // Adiciona o visitante à lista de participantes
            setNewVisitorName(''); // Limpa o campo de input
        }
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
                                checked={selectedParticipants.some(p => p._id === participant._id)} // Marca se o participante está selecionado
                                onChange={(e) =>
                                    handlePresenceChange(participant._id, e.target.checked) // Atualiza presença ao mudar checkbox
                                }
                            />
                            {participant.name} {/* Exibe o nome do participante */}
                        </label>

                        {/* Seleção de produtos consumidos apenas se o participante estiver presente */}
                        {selectedParticipants.some(p => p._id === participant._id) && (
                            products.map((product) => (
                                <div key={product._id}>
                                    <label>
                                        {product.name} {/* Exibe o nome do produto */}
                                        <input
                                            type="number"
                                            placeholder="Quantidade consumida"
                                            onChange={(e) =>
                                                handleProductSelection(
                                                    participant._id,
                                                    product._id,
                                                    e.target.value // Atualiza a quantidade consumida
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                            ))
                        )}
                    </div>
                ))}

                {/* Formulário para adicionar visitantes */}
                <div>
                    <h4>Adicionar Visitante</h4>
                    <input
                        type="text"
                        value={newVisitorName}
                        placeholder="Nome do Visitante"
                        onChange={(e) => setNewVisitorName(e.target.value)}
                    />
                    <button type="button" onClick={handleAddVisitor}>
                        Adicionar Visitante
                    </button>
                </div>

                <button type="button" onClick={handleSubmit}>Salvar Fechamento</button>
            </form>
        </div>
    );
};

export default ClosingPage;
