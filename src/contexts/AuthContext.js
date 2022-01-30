import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.js'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password) {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      return {
        error: false,
        message: res
      }
    }
    catch (err) {
      console.log('in the catch block')
      return {
        error: true,
        message: err
      }
    }
  }
  async function login(email, password) {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password)
      return {
        error: false,
        message: res
      }
    }
    catch (err) {
      console.log('in the catch block')
      return {
        error: true,
        message: err
      }
    }
  }
  useEffect(() => {
    const unsubscripe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscripe
  }, [])

  const value = {
    currentUser,
    login,
    signup
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
