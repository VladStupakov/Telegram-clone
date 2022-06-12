import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [user, setUser] = useState()
    const [loginError, setLoginError] = useState()
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache': 'no-cache',
                'Access-Control-Allow-Origin' : 'http://localhost:3001'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(user)
        })
            .then((response) => { return response.json() })
            .then((response) => {
                if (response.success) {
                    navigate('/')
                }
                if(response.error){
                    setLoginError(response.error)
                }
            })
    }

    const Error = () =>{
        return(
            <div>{loginError}</div>
        )
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <input type="text" name="email" onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" />
                <input type="text" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
                <button type="submit" >Log in</button>
            </form>
            {loginError ? <Error /> : ''}
        </div>
    )
}

export default Login
