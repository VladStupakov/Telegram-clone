import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, useFormControl } from '@mui/material';

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

const MembersList = ({ show, close, chat }) => {

    const [members, setMembers] = useState({})
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        const url = 'http://localhost:3001/main/members/' + chat.type + `/${chat._id}`
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
        })
            .then((response) => { return response.json() })
            .then((response) => {
                if (response.error)
                    console.log(response.error)
                else {
                    setMembers(response.data[0].members)
                    setIsloading(false)
                }
            })
    }, [])

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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
                        {
                            !isLoading ? members.map(member => {
                                return <p key={member._id}>{member.name + ' ' + member.surname}</p>
                            }) : 'loading members..'
                        }
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default MembersList