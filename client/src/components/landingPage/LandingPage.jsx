import "./landingPage.css";
import { React } from "react";

export const LandingPage = () =>{




    return(
        <div className="landingBody">

            <div className="landingContainer">
                <div className="landingTitle">
                    <h1>Welcome to my food project!</h1>
                </div>
                <div className="landingImage">
                    <img src="" alt=""/>
                </div>
                <div className="landingSub">
                    <h3>This is an application I made using HTML, CSS and Javascript, and applications like React, Redux, Express.js, Node.js, PostgreSQL and Sequelize as my ORM. These are things I've learned while I was Studying in fullstack web developer from "Soy Henry".</h3>
                    <p>In this SPA, single page application, you can check many recipes, search them, order them by name or their health-score, you can also filter them by their diet, you can even upload your own recipe and find it there. I invite you to check this application out, I'm sure you will enjoy this page.</p>
                </div>
            </div>
        </div>
    )
}