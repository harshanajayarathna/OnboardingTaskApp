import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function Delete({ item }) { 

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:7207/api/${item.url}/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success
            window.location.replace(`/${item.redirect}`);
            console.log('Deleted successfully');
        } catch (error) {
            console.error('There was a problem deleting the :', error.message);
        }
    };

    return (
        <>
            <Modal
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                trigger={<Button className="ui red button"> <span className="icon-right-align"><i class="trash alternate icon"></i></span> {item.buttonText} </Button>}
            >
                <Modal.Header>{item.title }</Modal.Header>
                <Modal.Content>
                    <h3>Are you sure?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="ui button red" onClick={handleDelete}>Delete  <span className="icon-right-align"><i class="x icon"></i></span> </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
