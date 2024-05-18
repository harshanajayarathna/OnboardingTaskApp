import { React, useState } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Create({ isCreated }) {

    // states
    const [open, setOpen] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);      

    const [formData, setFormData] = useState({
        name: '',
        address: ''
    });

    // methods
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7207/api/Customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
                                   
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success           
            console.log('Customer created successfully');

            setCreateError(false);
            setCreateSuccess(true);
            

            setTimeout(() => {
                handleClose()
                isCreated(true)
            }, 3000);


        } catch (error) {
            setCreateSuccess(false);
            setCreateError(true);
            console.error('There was a problem creating customer:', error.message);
        }
    };

    return (
        <>
            <Modal
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                trigger={<Button className="ui primary button">New Customer</Button>}
            >
                <Modal.Header>Create Customer</Modal.Header>
                <Modal.Content>
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
                    </form>

                    {createSuccess && (
                        <Message positive>
                            <p>The customer has been created successfully.</p>
                        </Message>
                    )}

                    {createError && (
                        <Message negative>
                            <p>There was an error while creating the customer.</p>
                        </Message>
                    )}

                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="ui teal button" onClick={handleSubmit}>Create <span className="icon-right-align"><i class="check icon"></i></span> </Button>
                   
                </Modal.Actions>
            </Modal>
        </>
    );
}
