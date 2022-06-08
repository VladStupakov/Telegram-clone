import React, { useState, useEffect } from 'react'

const ChatsList = ({data}) => {

    return (
        <div>
            {data?
            data.map(chat => {
                return (
                    <div key={chat._id}>
                         {chat.lastMessage.text}
                    </div>
                )
            }): 'no data'}
        </div>
    )
}

export default ChatsList