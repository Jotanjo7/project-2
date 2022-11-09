import "./Details.css";
import img from "../card/cooking.jpg"
import { React, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getDetails, cleanDetail} from "../../redux/actions";

export const Details = (props) => {
    const { id } = props.match.params;
    const dispatch= useDispatch();
    const details = useSelector((state)=> state.details);
    
    useEffect(() => {
        dispatch(getDetails(id));
        return () => {
            dispatch(cleanDetail());
        };
    }, [dispatch, id]);
    const detalles = details
    console.log(detalles.dish);

    return(<div>
    <div className="cardbody">
    <div className="recipeDetails">
    <h1 className="namedRecipe">{details.name}</h1>
    <div className="recipeInformation">
    <div className="currentDiets">
    <h2>Diets:</h2>
    <ul>
        {details.diets && details.diets.length ? details.diets.map((diet) => (<li key={diet}>{diet}</li>)): (<p>Unfortunately, this recipe has no diet registered</p>)}
    </ul>
    </div>
    <div>
        <h2>Dish types:</h2>
        <p>{details.dish && details.dish.map((e)=> e).join(", ")}</p>
    </div>
    <div className="currentSummary">
        <h2>Summary:</h2>
        <p>{details.summary}</p>
    </div>
    <div className="currentSteps">
        <h2>Steps:</h2>
        <p>{details.steps}</p>
    </div>    
    </div>
    </div>
    <div className="imageDetails">
    <img src={details.image || img} alt={details.name} />
    <div className="imageInfo">
    <h2>Info</h2>
    <ul>

    <li><strong>Author: </strong>{details.credits}</li>
    <li><strong>Health score: </strong>{details.score}</li>
    <li><strong>Source: </strong><a href={details.source}>{details.source}</a></li>
    <li><strong>Id: </strong>{details.id}</li>
    </ul>
    </div>
    </div>
    </div>
    </div>)
}