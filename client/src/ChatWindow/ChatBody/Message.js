import React, { useState, useEffect } from 'react'

const Message = ({body, user}) => {

    return (        
        <div className={`Chat__Message ${body.author === user ? "Chat__Reciever" : ""}`}>
            <div>{body.text}</div>
            <div className="Chat__TimeStamp" >{body.timestamp}</div>
        </div>
    )
}

export default Message