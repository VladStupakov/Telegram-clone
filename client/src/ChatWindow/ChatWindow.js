import React, { useState, useEffect } from 'react'
import ChatHeader from '../ChatWindow/ChatHeader.js'
import ChatBody from '../ChatWindow/ChatBody.js'

const ChatWindow = ({data}) => {

    const MainWindow = () =>{
        return(
            <div>
                <ChatHeader members={data.members} />
                <ChatBody messages={data.chat.messages} />
            </div>
        )
    }

    return (        
        data? <MainWindow />
        : 'loading messages'
    )
}

export default ChatWindow