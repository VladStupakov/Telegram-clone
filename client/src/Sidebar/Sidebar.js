import React, { useState, useEffect } from 'react'
import SingleChat from './SingleChat/SingleChat.js'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import './Sidebar.css'

const Sidebar = ({ data, setSelectedChat, user }) => {

    const [activeChat, setActiveChat] = useState()

    return (
        <div className='Sidebar'>
            <div className="Sidebar__Header">
                <div className="Sidebar__HeaderProfile">
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className="Sidebar__HeaderSearch">
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className='Sidebar__ChatsList'>
                {data ?
                    data.map(chat => {
                        return <SingleChat key={chat._id} body={chat} setSelectedChat={setSelectedChat} user={user} isSelected={activeChat === chat._id} setActiveChat={setActiveChat} />
                    }) : 'loading data...'}
            </div>
        </div>
    )
}

export default Sidebar