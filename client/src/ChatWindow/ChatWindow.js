import React, { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader/ChatHeader.js'
import ChatBody from '../ChatWindow/ChatBody/ChatBody.js'
import './ChatWindow.css'


const ChatWindow = ({ data, toggleChatInformation, user }) => {

    const MainWindow = () => {
        return (
            <div className='Chat'>
                <ChatHeader chat={data} toggleChatInformation={toggleChatInformation} />
                <ChatBody messages={data.chat.messages} user={user}/>
            </div>
        )
    }

    return (
        data ? <MainWindow />
            : 'select chat...'
    )
}

export default ChatWindow