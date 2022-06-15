import React, { useState, useEffect, useRef } from 'react'
import './ChatMenu.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const ChatMenu = ({ chat, hideMenu, parentNode }) => {

    const [open, setOpen] = useState(false)
    const [text, setText] = useState()
    const [menuItem, setMenuItem] = useState()
    const node = useRef()
    const [position, setPosition] = useState({})

    useEffect(() => {        
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(()=>{
        calculatePosition()
    }, [node])

    const calculatePosition = () => {
        setPosition({
            x: parentNode.current.offsetLeft - 30 + 'px',
            y: parentNode.current.offsetTop + 30 + 'px',
        })
    }

    const handleClick = (e) => {
        if (!node.current.contains(e.target) && !parentNode.current.contains(e.target)) {
            hideMenu();
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        hideMenu()
        setOpen(false);
    };

    const handleAgree = () => {
        let requestUrl = ""
        const params = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3001'
            },
            mode: 'cors',
            credentials: "include",
        }
        switch (menuItem) {
            case 'delete':
                requestUrl = "http://localhost:3001/main/delete-chat"
                params.method = 'DELETE'
                params.body = JSON.stringify({ chatId: chat })
                break;
            case 'clear':
                requestUrl = "http://localhost:3001/main/clear-chat"
                params.method = 'DELETE'
                params.body = JSON.stringify({ chatId: chat })
                break;
            default:
                break;
        }
        fetch(requestUrl,
            params,
        )
        setOpen(false)
    }

    return (
        <div ref={node} style={{left: position.x, top: position.y}} className="Chat__Menu" >
            <div className="Chat__MenuItem" onClick={() => { handleClickOpen(); setText('delete this chat'); setMenuItem('delete') }} >Delete chat</div>
            <div className="Chat__MenuItem" onClick={() => { handleClickOpen(); setText('clear message history'); setMenuItem('clear') }} >Clear chat</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm your action"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure want to {text} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleAgree} color="primary" >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ChatMenu