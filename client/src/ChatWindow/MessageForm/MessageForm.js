import React, { useState, useRef } from 'react'
import { IconButton, TextareaAutosize } from '@mui/material'
import MoodIcon from '@mui/icons-material/Mood';
import MicNoneIcon from '@mui/icons-material/MicNone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import './MessageForm.css'

const MessageForm = ({ chatData }) => {

    const [message, setMessage] = useState({media: '', text: ''})

    let inputFile = ''

    const handleInputClick = () => {
        inputFile.click()
    }

    const handleFilesUpload = (e) => {
        setMessage({ ...message, media: e.target.files })
    }

    const handleTextChange = (e) => {
        setMessage({ ...message, text: e.target.value })
    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            submit();
            setMessage({media: '', text: ''})
        }
    }

    const submit = () => {
        const formData = new FormData()
        formData.append('type', chatData.chat.type)
        formData.append('id', chatData.chat._id)
        formData.append('message', JSON.stringify({ text: message.text, timestamp: new Date().toLocaleTimeString(), media: [] }))
        if (message.media)
            for (let i = 0; i < message.media.length; i++) {
                formData.append('files', message.media[i])
            }
        fetch('http://localhost:3001/main', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3001'
            },
            mode: 'cors',
            credentials: "include",
            body: formData
        })
    }


    return (
        <div className="Chat__Footer">
            <IconButton onClick={handleInputClick}>
                <AttachFileIcon />
            </IconButton>
            <form>
                <input type="file" multiple style={{ display: "none" }} ref={input => { inputFile = input }} onChange={handleFilesUpload} />
                <TextareaAutosize placeholder="Type a message..." onKeyDown={onEnterPress} value={message.text} onChange={handleTextChange} />
                <button type="submit"></button>
            </form>
            <IconButton>
                <MoodIcon />
            </IconButton>
            <IconButton>
                <MicNoneIcon />
            </IconButton>
        </div>
    )
}

export default MessageForm