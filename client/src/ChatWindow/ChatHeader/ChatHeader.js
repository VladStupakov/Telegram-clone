import React, { useState, useEffect, useRef } from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import ChatMenu from '../ChatHeader/ChatMenu/ChatMenu.js';
import './ChatHeader.css'

const ChatHeader = ({ chat, toggleChatInformation }) => {

    const [chatMenuVisibility, setChatMenuVisibility] = useState(false)
    const node = useRef()

    const formatMembers = () => {
        let formatedMembers = ''
        chat.members.forEach((member, index) => {
            if (index === chat.members.length - 1)
                formatedMembers += member.name
            else
                formatedMembers += member.name + ', '
        })
        return formatedMembers
    }

    const toggleChatMenu = () => {
        setChatMenuVisibility((prevState) => !prevState)
    }

    return (
        <div className="Chat__Header">
            <div className="Chat__HeaderInfo">
                <div className="Chat__HeaderChatName">{formatMembers()}</div>
                <div className="Chat__HeaderLastSeenAt">5 minutes ago</div>
            </div>
            <div className="Chat__HeaderButtons">
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton onClick={() => toggleChatInformation(prevState => !prevState)}>
                    <ViewCompactIcon />
                </IconButton>
                <IconButton onClick={toggleChatMenu} ref={node}>
                    <MoreVertIcon />
                </IconButton>
            </div>
            {
                chatMenuVisibility && <ChatMenu chat={chat} hideMenu={toggleChatMenu} parentNode={node}/>
            }
        </div>
    )
}

export default ChatHeader