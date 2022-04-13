import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route } from "react-router-dom";

// const PrivateRoute = ({ AnyComponent }) => {

//     const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated)

//     return isAuthenticated ? <AnyComponent /> : <Navigate to="/login" />
// }


const PrivateRoute = ({ children }) => {

    const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);

    return isAuthenticated ? children : <Navigate to='/login' />;
}

export default PrivateRoute