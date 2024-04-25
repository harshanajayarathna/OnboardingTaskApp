import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
export default function List() {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        // Simulate a fetch call to load users data
        fetch('https://localhost:7207/api/Sale')
            .then(response => response.json())
            .then(data => setSales(data))
            .catch(error => console.error('Error fetching sales:', error));
    }, []);

    const handleDelete = async (saleId) => {
        try {
            const response = await fetch(`https://localhost:7207/api/Sale/${saleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success
            window.location.replace("/sales");
            console.log('Sale deleted successfully');

        } catch (error) {
            console.error('There was a problem deleting sale:', error.message);
        }
    };

    return (
        <>
            <a className="ui blue button" href="/sales/create">
                New Sale
            </a>

            <table className="ui celled table">
                <thead>
                    <tr><th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Date Sold</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td data-label="Customer">{sale.customer.name}</td>
                            <td data-label="Product">{sale.product.name}</td>
                            <td data-label="Store">{sale.store.name}</td>
                            <td data-label="Date Sold">{sale.dateSold}</td>
                            <td>
                                <a className="ui orange  button" href={`sales/update/${sale.id}`}>
                                    <i className="edit icon"></i> Edit
                                </a>
                                <button className="ui red button" onClick={() => handleDelete(sale.id)}>
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