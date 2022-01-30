import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()


        setError('')
        setLoading(true)
        // console.log('try once')
        const res = await login(emailRef.current.value, passwordRef.current.value)
        // console.log(res)

        if (res.error) {
            console.log(res)
            setError(res.message.message.substring(10).replace('auth/', '').replace(/-/g, ' '))
        }
        // console.log('try2')
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
            <br />
            <div>Don't have an account? <Link to="/signup">Sign up</Link></div>
        </>
    )
}
