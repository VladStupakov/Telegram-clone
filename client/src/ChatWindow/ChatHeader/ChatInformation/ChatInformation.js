import React, { useState } from 'react'
import './ChatInformation.css'
import MembersList from '../MembersList/MembersList.js'

const ChatInformation = ({ chat }) => {

    const [showMembersList, setShowMembersList] = useState(false)

    return (
        <div className="ChatInformation" >
            <div className='ChatInformation__Header'>
                <div className='ChatInformation__MembersCount' onClick={() => setShowMembersList(true)}>
                    There are {chat.members.length} members in this chat.
                    Click to see the list
                </div>
            </div>
            <div className='ChatInformation__Body'>

            </div>
            {showMembersList && <MembersList show={showMembersList} close={() => setShowMembersList(false)} chat={chat}/>}
        </div>
    )
}

export default ChatInformation