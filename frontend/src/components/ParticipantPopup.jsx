import React from 'react';




const ParticipantPopup = ({ participant, products, onClose, handleConsumptionChange }) => {
    console.log('Dados do participante no popup:', participant);
    console.log('Produtos consumidos:', participant.consumptions);
    if (!participant) {
        return null;  // Retorna nulo se participant não estiver disponível
    }

    return (
        <div className="popup">
            <h3>Consumo de {participant.name}</h3>
            <ul>
                {participant.consumptions  && participant.consumptions.length > 0 ? (
                    participant.consumptions.map((product, productIndex) => (
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