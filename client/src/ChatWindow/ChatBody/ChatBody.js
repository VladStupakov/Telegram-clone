import React, { useState, useEffect , useRef} from 'react'
import Message from './Message.js'
import './ChatBody.css'

const ChatBody = ({ messages, user }) => {

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevData = usePrevious(messages)

    useEffect(() => {
        console.log(prevData)
        console.log(messages)
    }, [messages])

    return (
        <div className='Chat__Body'>
            {
                messages.map((message) => {
                    return <Message key={message._id} body={message} user={user}/>
                })
            }
        </div>

    )
}

export default React.memo(ChatBody)