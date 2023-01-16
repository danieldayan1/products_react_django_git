
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Header(): JSX.Element {
    return (  
        <div className="Header">
            <AuthMenu />
            <div className="home"><NavLink to="/home"><h1>Shop Online!</h1></NavLink></div>
        </div>
    );
}

export default Header;
