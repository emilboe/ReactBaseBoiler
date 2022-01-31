import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        setError('')
        setLoading(true)

        const res = await login(emailRef.current.value, passwordRef.current.value)
        // Not a great way to handle error codes, but fine for now.
        if (res.error) {
            console.log(res)
            setError(res.message.message.substring(10).replace('auth/', '').replace(/-/g, ' '))
        } else {
            navigate('/')
        }

        setLoading(false)
    }

    return (
        <>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label><br />
                    <input type="email" ref={emailRef} required />
                </div>
                <div>
                    <label>Password</label><br />
                    <input type="password" ref={passwordRef} required />
                </div>
                <br />
                <button disabled={loading} type="submit">Log in</button>
                <div>{error ? error : ''}</div>
                <div>{currentUser && currentUser.email}</div>
            </form>
            <div>
                <Link to='/forgot-password'>Forgotten pasword?</Link>
            </div>
            <br />
            <div>Don't have an account? <Link to="/signup">Sign up</Link></div>
        </>
    )
}
