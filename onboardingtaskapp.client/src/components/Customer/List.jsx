import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
import CustomerCreate from './Create';
import CustomerEdit from './Edit';
import CustomerDelete from '../Common/Delete';

export default function List() {

    const [customers, setCustomers] = useState([]);       

    useEffect(() => {       
        fetch('https://localhost:7207/api/Customer')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);


    const handleDelete = async (customerId) => {
        try {
            const response = await fetch(`https://localhost:7207/api/Customer/${customerId}`, {
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
            console.log('Customer deleted successfully');
            
        } catch (error) {
            console.error('There was a problem deleting customer:', error.message);
        }
    };


    return (
        <>

            <CustomerCreate />
            

            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td data-label="Name">{customer.name}</td>
                            <td data-label="Address">{customer.address}</td>
                            <td>
                                <CustomerEdit item={{ customer}} />                               
                            </td>
                            <td>
                                <CustomerDelete item={{ id: customer.id, title: 'Delete Customer', buttonText: 'DELETE', url: 'Customer',  redirect: '' }} />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>                      

        </>
    )
}