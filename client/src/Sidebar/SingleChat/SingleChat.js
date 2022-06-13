import React, { useState, useEffect } from 'react'
import './SingleChat.css'
import { Avatar } from '@mui/material'

const SingleChat = ({ body, setSelectedChat, user, isSelected, setActiveChat }) => {
  
    const [members, setMembers] = useState()
    const [author, setAuthor] = useState()

    const handleChatClick = () => {
        setActiveChat(body._id)
        const url = 'http://localhost:3001/main/' + body.type + `/${body._id}`
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
        })
            .then((response) => { return response.json() })
            .then((response) => {
                setSelectedChat({ chat: response.data, members: body.members })
            })
    }

    useEffect(() => {
        formatMessageData()
    }, [])

    const formatMessageData = () => {
        let membersToString = ''
        body.members.forEach((member, index) => {
            if (body.lastMessage.author === member._id) {
                if (member._id === user)
                    setAuthor('You: ')
                else
                    setAuthor(member.name + ': ')
            }
            if (body.members.length < 4) {
                if (index === body.members.length - 1)
                    membersToString += member.name
                else
                    membersToString += member.name + ', '
            }
            else {
                if (index === 3)
                    membersToString += member.name + '...'
                else
                    membersToString += member.name + ', '
            }
        })
        setMembers(membersToString)
    }

    return (
        <div className="SingleChat" style={{ backgroundColor: isSelected ? '#54c3f3' : '' }} onClick={handleChatClick} >
            <Avatar />
            {body.lastMessage ? <div className="SingleChat__Info">
                <div className="SingleChat__ChatName">{members}</div>
                <div className="SingleChat__Author">{author}</div>
                <div className="SingleChat__LastMessage">{body.lastMessage.text}</div>
                <div className="SingleChat__TimeStamp">{body.lastMessage.timestamp}</div>
            </div> : ""}
        </div>
    )
}

export default SingleChat