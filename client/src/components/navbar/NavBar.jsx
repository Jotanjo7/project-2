import "./NavBar.css";
import { React, useState } from "react";
import { Link } from "react-router-dom";




export const NavBar = () => {
const [stado, setStado] = useState(false);
const handleClick = () => {
    setStado(!stado);
}

    return(
        <div className="navbar">
        <span className="logo"></span>
        <div className={`links ${stado && "open"}`}>
            <Link to="/home" className="route">
                Home
            </Link>
            <Link to="/about" className="route">
                About
            </Link>
            <Link to="/forms" className="route">
                Create
            </Link>
            <Link to="/userInfo" className="route">
                User Info
            </Link>
        </div>
        <div className={`toggle ${stado && "open"}`} onClick={handleClick}>
            <div className="icon"></div>
        </div>
        </div>
    )
}