import "./NotFound.css";
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from "./kisspng-http-404-error-message-desktop-wallpaper-5b007b75b00a91.3222422815267582617211.png";

export const NotFound = () => {
    const [active, setActive] = useState(false);
    useEffect(()=>{
        setActive(false);
    },[])
    const handleClick = () =>{
        setActive(!active);
    }

  return (
    <div className={`errorBody ${active && "closed"}`}>
        <div className="errorContainer" >
            <div className="errorImage">
                <img src={img} alt="error 404, not found" />
            </div>
            <div className="errorMessage">
            <h1>Sorry, we could not find this page</h1>
            <p>We suggest you to go back to the home page</p>
            </div>
            <div className="errorButton" onClick={ handleClick }>
            <Link to="/home">
                <button>Go back home</button>
            </Link>
            </div>
        </div>
    </div>
  )
}
