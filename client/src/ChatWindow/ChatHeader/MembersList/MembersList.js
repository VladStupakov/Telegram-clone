import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const MembersList = ({ members, show, close }) => {


    //get members list

    return (
        <div>
            <Modal
                open={show}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        List of members
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {
                            members.map(member => {
                                return <div>{member.name + ' ' + member.surname}</div>
                            })
                        }
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default MembersList