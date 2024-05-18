import React, { useState } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Delete({ item, isDeleted }) { 

    const [open, setOpen] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


        
    const handleDelete = async () => {

        if (item.id <= 0 || item.id === '') {
            throw new Error('Invalid Id');
        }

        try {
            const response = await fetch(`https://localhost:7207/api/${item.url}/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
                return;
            }
            // Handle success           
            console.log('Deleted successfully');   
            
            setDeleteSuccess(true);
           

            setTimeout(() => {
                handleClose()
                isDeleted(true) 
                
            }, 3000);
                  
            

        } catch (error) {
            setDeleteError(true);
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

                    
                    {deleteSuccess && (
                        <Message positive>
                           
                            <p>The record has been deleted successfully.</p>
                        </Message>
                    )}

                    {deleteError && (
                        <Message negative>                           
                            <p>There was an error while deleting the record.</p>
                        </Message>
                    )}


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
