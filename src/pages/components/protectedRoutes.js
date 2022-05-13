import React from "react";
import { Navigate } from "react-router-dom";
const isAuthenticated = localStorage.getItem("isAuthenticated");
console.log("from protected route :",localStorage.getItem('user'),JSON.parse(localStorage.getItem('isAuthenticated')))
console.log(JSON.parse(localStorage.getItem('user')))
const ProtectedRoute = ({
    adminRole,
    redirectPath,
    children,
}) => {
    if(adminRole === true){
        if( localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).admin === 1){
            return children ? children : <Navigate to="/" replace />;
        }
        else {
            return <Navigate to={redirectPath} replace />;
        }
    }
    else if (!JSON.parse(localStorage.getItem('isAuthenticated'))) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;