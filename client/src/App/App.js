import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import ChatsList from '../ChatsList/ChatsList.js'
import ChatWindow from '../ChatWindow/ChatWindow.js'
import Pusher from 'pusher-js';

const App = () => {

    const user = localStorage.getItem("user")
    const [data, setData] = useState()

    const AppWindow = () => {
        return (
            <div>
                <ChatsList data={data} />
                <ChatWindow />
            </div>
        )
    }

    useEffect(() => {
        console.log('call');
        const pusher = new Pusher('7c2eabd6eb5ada00a377', {
            cluster: 'eu',
        });
        const chats = pusher.subscribe('chats')
        const channels = pusher.subscribe('channels')
        chats.bind('newMessage', response => {
            console.log(data);
        });
        channels.bind('newMessage', response => {

        });
    }, [])


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
                if (response.data)
                    setData(response.data)
                if (response.error)
                    console.log(response.error)
            }
            )
    }

    useEffect(() => {
        console.log('call');
        getData()
    }, [])

    return (
        !user ?
            <Navigate to='/register' />
            : <AppWindow />
    )
}

export default App