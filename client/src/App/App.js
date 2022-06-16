import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.js'
import ChatWindow from '../ChatWindow/ChatWindow.js'
import Pusher from 'pusher-js';
import './App.css'
import ChatInformation from '../ChatWindow/ChatHeader/ChatInformation/ChatInformation.js';

const App = () => {

    const [data, setData] = useState()
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [selectedChat, setSelectedChat] = useState()
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const [isChatInformationVisible, setIsChatInformationVisible] = useState(false)

    const connectPusher = () => {
        const pusher = new Pusher('7c2eabd6eb5ada00a377', {
            cluster: 'eu',
        });
        const chats = pusher.subscribe('chats')
        const channels = pusher.subscribe('channels')
        chats.bind('newMessage', response => {
            handleChatUpdates(response)
        });
        channels.bind('newMessage', response => {
            handleChatUpdates(response)
        });
        setIsDataLoading(true)
    }


    const handleChatUpdates = (response) => {
        const modified = data.find(element => element._id === response.id && element.type === response.collection.slice(0, -1))
        if (modified.messagesCount < response.length) {
            const index = data.indexOf(modified)
            const newArrayElement = data[index]
            newArrayElement.lastMessage.text = response.data.text
            newArrayElement.lastMessage.timestamp = response.data.timestamp
            newArrayElement.lastMessage.author = response.data.author
            setData([
                ...data.slice(0, index),
                newArrayElement,
                ...data.slice(index + 1, data.length)
            ]);
        }
    }

    const getData = () => {
        fetch('http://localhost:3001/main', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => { return response.json() })
            .then((response) => {
                if (response.data) {
                    setData(response.data)
                    setUser(response.user)
                    setIsDataLoading(false)
                }
                if (response.error) {
                    if (response.error === 'login error')
                        navigate('/register')
                }
            }
            )
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (!isDataLoading)
            connectPusher()
    })

    return (
        <div className='App'>
            <div className='App__Body'>
                <Sidebar data={data} setSelectedChat={setSelectedChat} user={user} />
                <ChatWindow data={selectedChat} toggleChatInformation={setIsChatInformationVisible} user={user}/>
                {isChatInformationVisible && <ChatInformation chat={selectedChat.chat} />}
            </div>
        </div>
    )
}

export default App