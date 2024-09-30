import React from 'react';

const ParticipantPopup = ({ participant, products, onClose, handleConsumptionChange }) => {
    return (
        <div className="popup">
            <h3>Consumo de {participant.name}</h3>
            <ul>
                {participant.consumedProducts && participant.consumedProducts.length > 0 ? (
                    participant.consumedProducts.map((product, productIndex) => (
                        <li key={productIndex}>
                            {product.name} - {product.quantity} - R${product.price}
                            <input
                                type="number"
                                placeholder="Alterar Quantidade"
                                onChange={(e) => handleConsumptionChange(productIndex, participant._id, e.target.value)}
                                value={product.quantity}
                            />
                        </li>
                    ))
                ) : (
                    <p>Nenhum produto consumido.</p>
                )}
            </ul>
            <button onClick={onClose}>Fechar</button>
        </div>
    );
};

export default ParticipantPopup;
