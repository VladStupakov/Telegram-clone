import React, { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader/ChatHeader.js'
import ChatBody from '../ChatWindow/ChatBody/ChatBody.js'
import './ChatWindow.css'
import MessageForm from '../ChatWindow/MessageForm/MessageForm.js'

const ChatWindow = ({ data, toggleChatInformation, user }) => {

    const MainWindow = () => {
        return (
            <div className='Chat'>
                <ChatHeader chat={data} toggleChatInformation={toggleChatInformation} />
                <ChatBody messages={data.chat.messages} user={user} type={data.chat.type} id={data.chat._id}/>
                <MessageForm chatData={data}/>
            </div>
        )
    }

    return (
        data ? <MainWindow />
            : 'select chat...'
    )
}

export default ChatWindow