import React, { useState, useEffect , useRef} from 'react'
import Message from './Message.js'
import './ChatBody.css'

const ChatBody = ({ messages, user, type, id }) => {

    return (
        <div className='Chat__Body'>
            {
                messages.map((message) => {
                    return <Message key={message._id} body={message} user={user} type={type} id={id}/>
                })
            }
        </div>

    )
}

export default ChatBody