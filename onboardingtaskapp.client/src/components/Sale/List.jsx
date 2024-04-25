import { React, useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
import SaleCreate from './Create';
import SaleEdit from './Edit';
import SaleDelete from '../Common/Delete';

export default function List() {

    const [sales, setSales] = useState([]);

    useEffect(() => {        
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

            <SaleCreate />
           

            <table className="ui celled table">
                <thead>
                    <tr><th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Date Sold</th>
                        <th>Actions</th>
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
                                <SaleEdit item={{ sale }} />   
                            </td>
                            <td>
                                <SaleDelete item={{ id: sale.id, title: 'Delete Sale', buttonText: 'DELETE', url: 'Sale', redirect: 'sales' }} />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </>
    )
}