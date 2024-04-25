import { React, useState } from 'react'

export default function Create() {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',        
        
    });

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
            const response = await fetch('https://localhost:7207/api/Customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success
            window.location.replace("/");
            console.log('Customer created successfully');
        } catch (error) {
            console.error('There was a problem creating customer:', error.message);
        }
    };



    return (
        <>
            <form className="ui form" onSubmit={handleSubmit}>
                 
                <div className="field">
                    <label> Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div class="field">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}                    />
                </div>

                <button className="ui button" type="submit">Submit</button>
            </form>

        </>
    )
}