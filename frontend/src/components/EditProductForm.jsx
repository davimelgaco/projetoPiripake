import React, { useState } from 'react';
import axios from 'axios';

const EditProductForm = ({ product, eventId, onProductUpdated, onClose }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleUpdateProduct = () => {
        axios.put(`http://localhost:5000/events/${eventId}/products/${product._id}`, editedProduct) // Use editedProduct aqui
            .then(response => {
                onProductUpdated(response.data); // Chama a função passada como prop para atualizar o estado
                console.log("Produto Atualizado");
                onClose(); // Fecha o formulário após a atualização
            })
            .catch(error => console.error('Erro ao atualizar produto:', error));
    };
    

    return (
        <div>
            <h2>Editar Produto</h2>
            <input
                type="text"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                placeholder="Nome do Produto"
            />
            <input
                type="number"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                placeholder="Preço"
            />
            <input
                type="number"
                value={editedProduct.quantity}
                onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })}
                placeholder="Quantidade"
            />
            <button onClick={handleUpdateProduct}>Atualizar Produto</button>
            <button onClick={onClose}>Cancelar</button>
        </div>
    );
};

export default EditProductForm;
