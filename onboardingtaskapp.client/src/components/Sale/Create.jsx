import { React, useState, useEffect } from 'react'
import { Modal, Button } from 'semantic-ui-react';

export default function Create() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({       
        customerId: '',
        productId: '',
        storeId: '',
        dateSold: ''        
        
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

        console.log(name, value);

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
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
            window.location.replace("/sales");
            console.log('Store created successfully');
        } catch (error) {
            console.error('There was a problem creating store:', error.message);
        }
    };



    return (
        <>

            <Modal
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                trigger={<Button className="ui primary button">New Sale</Button>}
            >
                <Modal.Header>Create Sale</Modal.Header>
                <Modal.Content>
                    <form className="ui form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Customer</label>
                            <select className="ui search dropdown" id="customerId" name="customerId" onChange={handleChange}>
                                <option value="0">Select Customer</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}> {customer.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Product</label>
                            <select id="productId" name="productId" className="ui fluid dropdown" onChange={handleChange}>
                                <option value="0">Select Product</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Store</label>
                            <select id="storeId" name="storeId" className="ui fluid dropdown" onChange={handleChange}>
                                <option value="0">Select Store</option>
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
                                value={formData.dateSold}
                                onChange={handleChange} />
                        </div>
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="ui teal button" onClick={handleSubmit}>Create <span className="icon-wrapper"><i class="check icon"></i></span></Button>
                    
                </Modal.Actions>
            </Modal>                      

        </>
    )
}