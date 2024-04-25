import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
export default function List() {

    const [products, setProducts] = useState([]);

    useEffect(() => {        
        fetch('https://localhost:7207/api/Product')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`https://localhost:7207/api/Product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success
            window.location.replace("/products");
            console.log('Product deleted successfully');
            
        } catch (error) {
            console.error('There was a problem deleting product:', error.message);
        }
    };

    return (
        <>
            <a className="ui blue button" href="/products/create">
                New Product
            </a>

            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td data-label="Name">{product.name}</td>
                            <td data-label="Address">{product.price}</td>
                            <td>
                                <a className="ui orange  button" href={`products/update/${product.id}`}>
                                    <i className="edit icon"></i> Edit
                                </a>
                                <button className="ui red button" onClick={() => handleDelete(product.id)}>
                                    <i className="trash icon"></i>Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}