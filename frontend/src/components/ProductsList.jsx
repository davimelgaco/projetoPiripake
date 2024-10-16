import React from 'react';

const ProductsList = ({ products, onEditProduct }) => {
    return (
        <div>
            <h2>Lista de Produtos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th> {/* Nova coluna para o ID */}
                        <th>Nome do Produto</th>
                        <th>Preço Unitário</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        // Verifique se o ID existe
                        if (!product._id) {
                            console.warn('Produto sem ID:', product);
                            return null; // Não renderiza se não houver ID
                        }

                        return (
                            <tr key={product._id}>
                                <td>{product._id}</td> {/* Exibe o ID do produto */}
                                <td>{product.name}</td>
                                <td>{`R$${!isNaN(Number(product.price)) ? Number(product.price).toFixed(2) : 'N/A'}`}</td>
                                <td>{product.quantity}</td>
                                <td>{`R$${(product.price * product.quantity).toFixed(2)}`}</td>
                                <td>
                                    <button onClick={() => onEditProduct(product)}>Editar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;
