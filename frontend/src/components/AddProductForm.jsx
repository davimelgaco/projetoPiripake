import React,{useState} from 'react';
import axios from 'axios';

const AddProductForm = ({ eventId, onProductAdded, participants }) => {
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', consumers: [] });

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price > 0 && newProduct.quantity > 0) {
            axios.post(`http://localhost:5000/events/${eventId}/products`, newProduct)
                .then(response => {
                    console.log('Produto adicionado:', response.data); // Verifique se o _id está presente
                    onProductAdded(response.data);
                    setNewProduct({ name: '', price: '', quantity: '', consumers: [] }); // Limpa os campos
                })
                .catch(error => console.error('Erro ao adicionar produto:', error));
        }
    };

    const handleConsumerChange = (participantId) => {
        setNewProduct(prevState => {
            const consumers = prevState.consumers.includes(participantId)
                ? prevState.consumers.filter(id => id !== participantId)
                : [...prevState.consumers, participantId];
            return { ...prevState, consumers };
        });
    };

    return (
        <div>
            <h2>Adicionar Novo Produto</h2>
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
    );
};

export default AddProductForm;
