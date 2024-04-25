import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
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
            <a className="ui blue button" href="/stores/create">
                New Store
            </a>

            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td data-label="Name">{store.name}</td>
                            <td data-label="Address">{store.address}</td>
                            <td>
                                <a className="ui orange  button" href={`stores/update/${store.id}`}>
                                    <i className="edit icon"></i> Edit
                                </a>
                                <button className="ui red button" onClick={() => handleDelete(store.id)}>
                                    <i className="trash icon"></i>Save
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}