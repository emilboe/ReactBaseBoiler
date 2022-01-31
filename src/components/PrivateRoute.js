import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { getAuth } from 'firebase/auth'

export default function PrivateRoute({ children }) {
    const authed = getAuth() // getAuth() returns true or false based on localStorage
    // console.log(authed.currentUser)

    if (authed.currentUser === null || authed.currentUser === undefined) {
        console.log('fucked')
        return <Navigate to='/login' />
    } else {
        // console.log('apparently not fucked')
        return children
    }

    // return authed ? children : <Navigate to="/login" />;
}

// export default function PrivateRoute({ component: Component, ...rest }) {

//     const currentUser = useAuth()
//     // const navigate = useNavigate()

//     if (currentUser.email === null || currentUser.email === undefined) {
//         console.log('fucked')
//         return <Navigate to='/login' />
//     } else {
//         console.log('apparently not fucked')
//         return <Outlet />
//     }

    //     return (
    //         <Route

    //             {...rest}
    //             render={props => {
    //                 return currentUser ? <Component {...props} /> : <Navigate to='/login' />
    //             }}
    //         >

    //         </Route>
    //     )
// }

