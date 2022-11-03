import "./Card.css"
import img from "./cooking.jpg"
import { React} from "react";
import {Link} from "react-router-dom";

export default function Card(props) {



  return (
    <>
      <div className="card">
        <div className="image">
          <img src={props.image || img} alt={props.name} />
          {(typeof props.diets[0] === "string") ? (<h3>{props.diets.join(", ")}</h3>) : (<h3>{props.diets.map((diet) => diet.name).join(", ")}</h3>) }
        </div>
        <div className="details">
        <div className="center">          
          <h1>Recipe: </h1>
          <h2>{props.name}</h2>
          <div className="description">
          <p><span className="spancito">Time: </span>{props.time} minutes estimated</p>
          <p><span className="spancito">Score: </span>{props.score}</p>
          {(typeof props.diets[0] !== "string") && (<p>{props.diets.map((diet) => diet.name).join(", ")}</p>)}
          </div>
          <Link to={`/recipes/${props.id}`}>
            <button className="access">Details</button>
          </Link>
        </div>
        </div>
      </div>
    </>
  
  )
}

