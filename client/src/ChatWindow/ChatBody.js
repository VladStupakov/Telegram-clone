import React, { useState, useEffect } from 'react'
import Message from '../ChatWindow/Message.js'

const ChatBody = ({messages}) => {

    return (        
        messages.map((message) =>{
           return <Message key={message._id} body={message} />
       })
    )
}

export default ChatBody