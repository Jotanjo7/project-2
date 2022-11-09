import img from "./cheese-pizza-comfort-food-recipes-1627586748.jpeg";
import img2 from "./Bucatini.jpg";
import img3 from "./Easy Chicken and Broccoli - The Salty Marshmallow.png";
import img4 from "./Rabokki (Ramen + Dukboki), the Ultimate Korean Street Food.jfif";
import "./landingPage.css";
import { React } from "react";
import { Link } from "react-router-dom";

export const LandingPage = () =>{




    return(
        <div className="landingBody">

            <div className="landingContainer">
                <div className="landingTitle">
                    <h1>Welcome to my food project!</h1>
                </div>
                <div className="landingImage">
                    <img id="pizza" src={img} alt="Pizza"/>
                    <img id="Bucatini" src={img2} alt="Bucatini" />
                    <img id="Chicken" src={img3} alt="Chicken" />
                    <img id="Ramen" src={img4} alt="Ramen" />
                </div>

            </div>
            <div className="button">
            <Link to="/home">
                <button>Get started</button>
            </Link>
            </div>
            <div className="landingText">
                <p>Come and search all kind of recipes, look for all kind of diets and also see how much healthy these ones can be. <b>Try creating a recipe for this App too!</b></p>
            </div>
        </div>
    )
}