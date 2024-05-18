import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'

import ProductCreate from './Create';
import ProductEdit from './Edit';
import ProductDelete from '../Common/Delete';

//import { fetchCustomer } from '../../services/Service'

export default function List() {

    const [products, setProducts] = useState([]);

    useEffect(() => {       

        fetchProducts();
               
    }, []);

    const fetchProducts = async () => {

        try {
            await fetch('https://localhost:7207/api/Product')
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products:', error));

        } catch (error) {
            console.error('There was a problem fetching product data:', error.message);
        }
        
    };

    const handleDeleteSuccess = async (isDeleted) => {

        if (isDeleted) {
            await fetchProducts();
        }
    }

    const handleUpdateSuccess = async (isUpdated) => {

        if (isUpdated) {
            await fetchProducts();
        }
    }

    const handleCreateSuccess = async (isCreated) => {

        if (isCreated) {
            await fetchProducts();
        }
    }


    const renderTableRows = (product, handleUpdateSuccess, handleDeleteSuccess) => {
        return (
            <tr key={product.id}>
                <td data-label="Name">{product.name}</td>
                <td data-label="Address">{product.price}</td>
                <td>
                    <ProductEdit
                        item={{ product }}
                        isUpdated={handleUpdateSuccess}
                    />
                </td>
                <td>
                    <ProductDelete
                        item={{ id: product.id, title: 'Delete Product', buttonText: 'DELETE', url: 'Product', redirect: 'products' }}
                        isDeleted={handleDeleteSuccess}
                    />
                </td>
            </tr>

        )
    }


    return (
        <>
            
            <ProductCreate isCreated={handleCreateSuccess} />

            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => 

                        renderTableRows(product, handleUpdateSuccess, handleDeleteSuccess)
                                               
                    )}

                </tbody>
            </table>
        </>
    )
}