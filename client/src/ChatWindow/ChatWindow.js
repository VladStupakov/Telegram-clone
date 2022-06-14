import React, { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader/ChatHeader.js'
import ChatBody from '../ChatWindow/ChatBody.js'
import './ChatWindow.css'


const ChatWindow = ({data, toggleChatInformation}) => {

    const MainWindow = () =>{
        return(
            <div className='Chat'>
                <ChatHeader members={data.members} chat={data.chat._id} toggleChatInformation={toggleChatInformation}/>
                <ChatBody messages={data.chat.messages} />
            </div>
        )
    }

    return (        
        data? <MainWindow />
        : 'select chat...'
    )
}

export default ChatWindow