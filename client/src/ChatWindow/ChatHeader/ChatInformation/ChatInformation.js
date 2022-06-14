import React from 'react'

const ChatInformation = ({ chat }) => {

    const Member = ({ name }) => {
        return <div>{name}</div>
    }

    return (
        <div className="ChatInformation" >
            {
                chat.members.map((member) => {
                    return <Member key={member._id} name={member.name} />
                })
            }
        </div>
    )
}

export default ChatInformation