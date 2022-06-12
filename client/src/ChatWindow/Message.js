import React, { useState, useEffect } from 'react'

const Message = ({body}) => {

    return (        
        <div>
            <div>{body.text}</div>
            <div>{body.author}</div>
        </div>
    )
}

export default Message