import React, { useState, useEffect } from 'react'

const SingleChat = ({ body, setSelectedChat }) => {

    const handleChatClick = () => {
        const url = 'http://localhost:3001/main/' + body.type + `/${body._id}`
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
        })
            .then((response) => { return response.json() })
            .then((response) => {
                setSelectedChat({ chat: response.data, members: body.members })
            })
    }

    return (
        <div onClick={handleChatClick}>
            {body.lastMessage.text}
        </div>
    )
}

export default SingleChat