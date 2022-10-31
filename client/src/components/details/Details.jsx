import { React, useEffect} from 'react';
import { Link } from "react-router-dom";
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
    console.log(details.steps)
    const detalles = details
    console.log(detalles);

    return(<div>
    <div className="Cardbody">
    
    <img src={details.image} alt={details.name} />
    <h2>Recipe:{details.name}</h2>
    <p>Author: {details.credits}</p>
    <p>Health score: {details.score}</p>
    <h4>Time:{details.time} minutes estimated</h4>
    <p>{details.id}</p>
    <div>
    <h2>Diets:</h2>
    <ul>
        {details.diets && details.diets.length ? details.diets.map((diet) => (<li key={diet}>{diet}</li>)): (<p>Unfortunately, this recipe has no diet registered</p>)}
    </ul>
    </div>
    <div>
        <h2>Summary:</h2>
        <p>{details.summary}</p>
    </div>
    <div>
        <h3>Steps:</h3>
        <p>{details.steps}</p>
    </div>
    
    </div>
    </div>)
}