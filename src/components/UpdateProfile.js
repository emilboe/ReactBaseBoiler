import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { updateEmail, updatePassword, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('passwords do not match')
            return
        }

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            // console.log('value:', emailRef.current.value)
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then((res) => {
            // console.log(e[0].message.message)
            if (res[0].error) {
                console.log(res[0].message.message)
                setError(res[0].message.message.substring(10).replace('auth/', '').replace(/-/g, ' '))
            } else {
                navigate('/')
            }
            setLoading(false)

            // navigate('/')
        })
        // .catch(() => {
        //     setError('Failed to update account')
        // }).finally(() => {
        //     setLoading(false)
        // })
    }

    return (
        <>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>{currentUser && "You're currently logged in with : " + currentUser.email}</div>
                <br />
                <div>
                    <label>Email</label><br />
                    <input
                        type="email"
                        ref={emailRef}
                        required
                        autoComplete="off"
                        defaultValue={currentUser.email} />
                </div>
                <div>
                    <label>Password</label><br />
                    <input
                        type="password"
                        autoComplete="off"
                        defaultValue={""}
                        ref={passwordRef}
                        placeholder="Leave blank to not change"
                    />
                </div>
                <div>
                    <label>Confirm Password</label><br />
                    <input
                        type="password"
                        autoComplete="off"
                        ref={passwordConfirmRef}
                        placeholder="Leave blank to not change"
                    />
                </div>
                <br />
                <button disabled={loading} type="submit">Update Information</button>
                <div>{error ? error : ''}</div>
                <div>{message ? message : ''}</div>
            </form>
            <br />
            <Link to="/login">Cancel</Link>
        </>
    )
}
