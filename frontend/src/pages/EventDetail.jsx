import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductsList from './../components/ProductsList';
import AddProductForm from './../components/AddProductForm';
import EditProductForm from './../components/EditProductForm';
import { useNavigate } from 'react-router-dom';





const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [products, setProducts] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');
    const [allParticipants, setAllParticipants] = useState([]); // Para armazenar todos os participantes existentes
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
    const [editingProduct, setEditingProduct] = useState(null); // Estado para o produto em edição



    const handleProductUpdated = (updatedProduct) => {
        const updatedProducts = products.map(product =>
            product._id === updatedProduct._id ? updatedProduct : product
        );
        setProducts(updatedProducts);
    };

    // Funções para abrir e fechar o pop-up
    const [showPopup, setShowPopup] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const openParticipantPopup = (participant) => {
        console.log('Participante selecionado:', participant);
        setSelectedParticipant(participant); // Verifique se o participant aqui já tem `consumptions`
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

    const handleAddProduct = (newProduct) => {
        if (newProduct.name && newProduct.price && newProduct.quantity) {
            const updatedProducts = [...products, { ...newProduct, consumers: [] }];
            setProducts(updatedProducts);


            // Enviar dados atualizados ao backend
            axios.post(`http://localhost:5000/events/${id}/products`, newProduct)
                .catch(error => console.error('Erro ao adicionar produto:', error));
        }
    };

    const handleConsumptionChange = (productIndex, participantIndex, newQuantity) => {
        // Verifica se o novo valor de quantidade não está vazio
        if (newQuantity === '') return;

        // Clona a lista de produtos para evitar mutação direta
        const updatedProducts = [...products];
        // Clona a lista de participantes para evitar mutação direta
        const updatedParticipants = [...participants];

        // Acessa o participante que será atualizado
        const participant = updatedParticipants[participantIndex];

        // Atualiza a quantidade do produto específico do participante
        // Converte newQuantity para número para evitar erros em operações matemáticas
        participant.consumptions[productIndex].quantity = Number(newQuantity);

        // Atualiza o estado dos participantes
        setParticipants(updatedParticipants);

        // Desestrutura o ID do participante para uso posterior
        const { _id: participantId } = participant;

        // Verifica se o participante já está na lista de consumidores do produto
        if (updatedProducts[productIndex].consumers.includes(participantId)) {
            // Se estiver, remove o participante da lista de consumidores
            updatedProducts[productIndex].consumers = updatedProducts[productIndex].consumers.filter(id => id !== participantId);
            console.log("Participante removido da lista de consumidores");

        } else {
            // Caso contrário, adiciona o participante à lista de consumidores
            updatedProducts[productIndex].consumers.push(participantId);
            console.log("Participante adicionado na lista de consumidores");

        }

        // Atualiza o estado dos produtos
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
            console.log("Participante adicionado na lista de consumidores 2");

        } else {
            setConsumers(consumers.filter(id => id !== participantId));  // Remove se desmarcado
            console.log("Participante removido da lista de consumidores 2");

        }
    };

    //Redirecionamento para a pagina de fechamento de conta
    const navigate = useNavigate();
    const handleFecharConta = () => {
        navigate(`/fechamento-conta/${id}`);
    };

    if (!event) return <div>Carregando...</div>;

    return (
        <div>
            <h2>Detalhes do Evento: {event.name}</h2>
            <p>Data: {new Date(event.date).toLocaleDateString()}</p>
            <p>Local: {event.location}</p>

            {/* Adicionar Novo Produto */}
            <div>
                <AddProductForm
                    eventId={id}
                    onProductAdded={(newProduct) => setProducts([...products, newProduct])}
                />
                {/* Renderizando a lista de produtos */}
                <ProductsList
                    products={products}
                    onEditProduct={(product) => setEditingProduct(product)} // Adicione essa prop
                />

                {/* Se estiver editando um produto, renderize o EditProductForm */}
                {editingProduct && (
                    <EditProductForm
                        product={editingProduct}
                        eventId={id}
                        onProductUpdated={handleProductUpdated}
                        onClose={() => setEditingProduct(null)} // Para fechar o formulário
                    />
                )}


                <button onClick={handleAddProduct}>Adicionar Produto</button>
            </div>

            {/* Botão para fechar conta*/}
            <button onClick={handleFecharConta}>Fechar Conta</button>

        </div>

    );
};

export default EventDetail;
