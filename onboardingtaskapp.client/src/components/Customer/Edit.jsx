import { React, useState, useEffect } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Edit({ item, isUpdated }) {

    // states
    const [open, setOpen] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    const [formData, setFormData] = useState({        
        name: '',
        address: '',
    });
      
    useEffect(() => {

        if (item.customer.id <= 0 || item.customer.id === '') {
            throw new Error('Invalid Id');
        }
                
        fetchCustomer(item);

    }, [item.customer.id]);

    // const
    const API_END_POINT = `https://localhost:7207/api/Customer/`;

    // methods
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
        
    const fetchCustomer = async () => {
            try {
                const response = await fetch(`${ API_END_POINT + item.customer.id }`);

                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('There was a problem fetching customer data:', error.message);
            }
    };
       
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${ API_END_POINT + item.customer.id }`, {
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
            console.log('Updated successfully');

            setUpdateError(false);
            setUpdateSuccess(true);
           
            setTimeout(() => {
                handleClose()
                isUpdated(true)
            }, 3000);
           
        } catch (error) {
            setUpdateSuccess(false);
            setUpdateError(true);
            console.error('There was a problem updating record:', error.message);
        }
    };

    return (
        <>
            <Modal
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                trigger={<Button className="ui orange button"> <span className="icon-left-align"><i class="edit icon"></i></span> EDIT</Button>}
            >
                <Modal.Header>Update Customer</Modal.Header>
                <Modal.Content>
                    <form className="ui form" onSubmit={handleUpdate}>
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

                    {updateSuccess && (
                        <Message positive>
                            <p>The customer has been updated successfully.</p>
                        </Message>
                    )}

                    {updateError && (
                        <Message negative>
                            <p>There was an error while updating the customer.</p>
                        </Message>
                    )}

                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="ui teal button" onClick={handleUpdate}>Update <span className="icon-right-align"><i class="check icon"></i></span> </Button>
                    
                </Modal.Actions>
            </Modal>

           
        </>
    );
}
