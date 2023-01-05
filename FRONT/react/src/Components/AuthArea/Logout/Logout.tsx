import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import * as React from 'react'


function Logout(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        authService.logout();

        alert("Hope To See You Soon :)");
        navigate("/login");
    }, [])

    return null;
}

export default Logout;
