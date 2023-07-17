import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * @function AuthRoute
 * @description - constructs the applications authentication routes layout
 * @returns {JSX} - JSX
 */

const AuthRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
    // @ts-ignore
    const { user_token } = useSelector((store) => store.auth);
    const token = localStorage.getItem("token");

    const location = useLocation();

    if (user_token) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthRoute;
