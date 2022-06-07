import React, { useState, useEffect } from 'react'

const Register = () => {

    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [responseError, setResponseError] = useState()
    const [successMessage, setMessage] = useState()
    const emailRegExp = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    const passwordRegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')
    const [submitButtonStatus, setStatus] = useState(true)
    const [formErrors, setFormErrors] = useState([])
    
    let Submit = async (e) => {
        setFormErrors([])
        e.preventDefault()
        if (!validateForm())
            console.log(formErrors);
        else
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
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => { return response.json() })
                .then((response) => {
                    if (response.error){
                        if(response.error.code === 11000)
                            setResponseError('email already in use')
                    }                       
                    else (
                        setMessage(response.message)
                    )
                })
    }

    const ResponseError = () => {
        return <div>{responseError}</div>
    }

    const SuccessfulResponseMessage = () => {
        return <div>{successMessage}</div>
    }

    let handleNameChange = (e) => {
        setName(e.target.value)
    }

    let handleSurnameChange = (e) => {
        setSurname(e.target.value)
    }

    let handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    let handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    let handleFormChange = () => {
        if (name && surname && email && password)
            setStatus(false)
        else
            setStatus(true)
    }

    let validateForm = () => {
        let isValid = true
        if (!emailRegExp.test(email)) {
            isValid = false
            setFormErrors(prevErrors => [...prevErrors, 'wrong email format'])
        }
        if (!passwordRegExp.test(password)) {
            isValid = false
            setFormErrors(prevErrors => [...prevErrors, 'wrong password format'])
        }
        return isValid
    }

    const Errors = () => {
        return (
            <ul>
                {formErrors.map(err =>{
                    return <li key={err}>{err}</li>
                })}
            </ul>
        )
    }

    return (
        <div>
            <form onSubmit={Submit} onChange={handleFormChange}>
                <input type="text" name="name" placeholder='Name' onChange={(e) => handleNameChange(e)} />
                <input type="text" name="surname" placeholder='Surname' onChange={(e) => handleSurnameChange(e)} />
                <input type="text" name="email" placeholder='email' onChange={(e) => handleEmailChange(e)} />
                <input type="text" name="password" placeholder='password' onChange={(e) => handlePasswordChange(e)} />
                <button type="submit" disabled={submitButtonStatus}>Confirm</button>
            </form>
            {formErrors.length > 0 ? <Errors /> : ''}
            {responseError ? <ResponseError /> : <SuccessfulResponseMessage />}
        </div>
    )
}

export default Register