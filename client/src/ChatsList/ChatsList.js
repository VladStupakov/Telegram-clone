import React, { useState, useEffect } from 'react'
import SingleChat from '../ChatsList/SingleChat.js'


const ChatsList = ({data, setSelectedChat}) => {

    return (
        <div>
            {data?
            data.map(chat => {
                return <SingleChat key={chat._id} body={chat} setSelectedChat={setSelectedChat}/>
            }): 'loading data...'}
        </div>
    )
}

export default ChatsList