import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
import StoreCreate from './Create';
import StoreEdit from './Edit';
import StoreDelete from '../Common/Delete';
export default function List() {

    const [stores, setStores] = useState([]);

    useEffect(() => {
        // Simulate a fetch call to load users data
        fetch('https://localhost:7207/api/Store')
            .then(response => response.json())
            .then(data => setStores(data))
            .catch(error => console.error('Error fetching stores:', error));
    }, []);

    const handleDelete = async (storeId) => {
        try {
            const response = await fetch(`https://localhost:7207/api/Store/${storeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success
            window.location.replace("/");
            console.log('Store deleted successfully');

        } catch (error) {
            console.error('There was a problem deleting store:', error.message);
        }
    };

    return (
        <>
            <StoreCreate />

            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td data-label="Name">{store.name}</td>
                            <td data-label="Address">{store.address}</td>
                            <td>
                                <StoreEdit item={{ store }} />          
                            </td>
                            <td>
                                <StoreDelete item={{ id: store.id, title: 'Delete Store', buttonText: 'DELETE', url: 'Store', redirect: 'stores' }} />
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}