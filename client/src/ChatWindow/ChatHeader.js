import React, { useState, useEffect } from 'react'

const ChatHeader = ({ members }) => {

    return (
        <div>
            {members? members.map((member) => {
                return <div key={member._id}>{member.name}</div>
            }): ''}
        </div>
    )
}

export default ChatHeader