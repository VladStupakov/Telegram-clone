import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [responseError, setResponseError] = useState()
    const [responseSuccess, setResponseSuccess] = useState()
    const emailRegExp = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    const passwordRegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [formErrors, setFormErrors] = useState([])

    const Submit = async (e) => {
        setFormErrors([])
        setResponseError()
        e.preventDefault()
        if (validateForm()) {
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
                    if (response.error) {
                        if (response.error.code === 11000)
                            setResponseError('email already in use')
                    }
                    else (
                        setResponseSuccess(response.message)
                    )
                })
        }
    }

    const ResponseError = () => {
        return <div>{responseError}</div>
    }

    const SuccessfulResponseMessage = () => {
        return <div>{responseSuccess}</div>
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSurnameChange = (e) => {
        setSurname(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleFormChange = () => {
        if (name && surname && email && password)
            setIsSubmitDisabled(false)
        else
            setIsSubmitDisabled(true)
    }

    const validateForm = () => {
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
                {formErrors.map(err => {
                    return <li key={err}>{err}</li>
                })}
            </ul>
        )
    }

    return (
        <div>
            <h3>Register to use chat</h3>
            <form onSubmit={Submit} onChange={handleFormChange}>
                <input type="text" name="name" placeholder='Name' onChange={(e) => handleNameChange(e)} />
                <input type="text" name="surname" placeholder='Surname' onChange={(e) => handleSurnameChange(e)} />
                <input type="text" name="email" placeholder='email' onChange={(e) => handleEmailChange(e)} />
                <input type="text" name="password" placeholder='password' onChange={(e) => handlePasswordChange(e)} />
                <button type="submit" disabled={isSubmitDisabled}>Confirm</button>
            </form>
            {formErrors.length > 0 ? <Errors /> : ''}
            {responseError ? <ResponseError /> : <SuccessfulResponseMessage />}
            <div>Already registered?
                <Link to="/login">Log in</Link>
            </div>
        </div>
    )
}

export default Register