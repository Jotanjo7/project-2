import { React} from "react";
import {Link} from "react-router-dom";

export default function Card(props) {



  return (
    <div>
    <div className="Cardbody">
    
    <img src={props.image} alt={props.name} />
    <h2>Recipe:{props.name}</h2>
    <h4>Time:{props.time} minutes estimated</h4>
    <p>{props.id}</p>
    </div>
    <Link to={`/recipes/${props.id}`}>
      <button>Check the details</button>
    </Link>
    </div>
  
  )
}

