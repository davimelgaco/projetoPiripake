import React from 'react';

const ProductsList = ({ products, onEditProduct }) => {
    return (
        <div>
            <h2>Lista de Produtos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Preço Unitário</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{`R$${product.price.toFixed(2)}`}</td>
                            <td>{product.quantity}</td>
                            <td>{`R$${(product.price * product.quantity).toFixed(2)}`}</td>
                            <td>
                                <button onClick={() => onEditProduct(product)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;
d