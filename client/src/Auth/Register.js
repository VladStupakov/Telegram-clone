import React, { useState } from 'react'

const Register = () => {

    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let Submit = async (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/register', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                'name': name,
                'surname': surname,
                'email': email,
                'password': password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <input type="text" name="name" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                <input type="text" name="surname" placeholder='Surname' onChange={(e) => setSurname(e.target.value)} />
                <input type="email" name="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <input type="text" name="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Confirm</button>
            </form>
        </div>
    )
}

export default Register