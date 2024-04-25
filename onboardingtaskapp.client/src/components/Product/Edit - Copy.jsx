import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
    const { productId } = useParams();
    const [formData, setFormData] = useState({        
        name: '',
        price: '',  
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://localhost:7207/api/Product/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('There was a problem fetching product data:', error.message);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7207/api/Product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success
            console.log('Product updated successfully');
            window.location.replace("/products");
           
        } catch (error) {
            console.error('There was a problem updating product:', error.message);
        }
    };

    return (
        <>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label>Address</label>
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}      
                    />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </>
    );
}
