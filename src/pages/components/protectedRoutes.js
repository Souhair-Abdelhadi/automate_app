import React from "react";
import { Navigate } from "react-router-dom";
const isAuthenticated = localStorage.getItem("isAuthenticated");
console.log("is authenticated ", isAuthenticated);

const ProtectedRoute = ({
    adminRole,
    redirectPath,
    children,
}) => {
    if (isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;