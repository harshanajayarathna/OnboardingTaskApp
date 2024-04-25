import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
    const { customerId } = useParams();
    const [formData, setFormData] = useState({        
        name: '',
        address: '',
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`https://localhost:7207/api/Customer/${customerId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('There was a problem fetching customer data:', error.message);
            }
        };
        fetchCustomer();
    }, [customerId]);

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
            const response = await fetch(`https://localhost:7207/api/Customer/${customerId}`, {
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
            console.log('Customer updated successfully');
            window.location.replace("/");
           
        } catch (error) {
            console.error('There was a problem updating customer:', error.message);
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
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </>
    );
}
