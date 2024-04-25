import { React, useState, useEffect } from 'react'

export default function Create() {

    const [formData, setFormData] = useState({       
        name: '',
        address: '',        
        
    });

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7207/api/Customer')
            .then(response => response.json())
            .then(
                data => setCustomers(data)                
            )
            .catch(error => console.error('Error fetching customers:', error));
    }, []);      

    useEffect(() => {
        fetch('https://localhost:7207/api/Product')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);
   
    useEffect(() => {
        fetch('https://localhost:7207/api/Store')
            .then(response => response.json())
            .then(data => setStores(data))
            .catch(error => console.error('Error fetching stores:', error));
    }, []);

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
            const response = await fetch('https://localhost:7207/api/Sale', {
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
            window.location.replace("/stores");
            console.log('Store created successfully');
        } catch (error) {
            console.error('There was a problem creating store:', error.message);
        }
    };



    return (
        <>
            <form className="ui form" onSubmit={handleSubmit}>
                 
                <div className="field">
                    <label>Customer</label>
                    <select className="ui search dropdown" id="customerId" name="customerId">
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}> {customer.name}</option>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label>Product</label>
                    <select id="productId" name="productId" className="ui fluid dropdown">
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label>Store</label>
                    <select id="storeId" name="storeId" className="ui fluid dropdown">
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                    </select>
                </div>
                <div class="field">
                    <label>Date Sold</label>
                    <input
                        type="text"
                        name="dateSold"
                        placeholder="Date Sold"
                        value={formData.datesold}
                        onChange={handleChange} />
                </div>
                

                <button className="ui button" type="submit">Submit</button>
            </form>

        </>
    )
}