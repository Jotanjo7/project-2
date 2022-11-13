import "./forms.css";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../../redux/actions";



export const Forms = () => {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets)
   
   
    const [input, setInput] = useState({
        name: "",
        credits: "",
        source: "",
        time: "",
        score: "",
        summary: "",
        steps: "",
        diets: []
    });
    const [error, setError] = useState({});

    const handleChange= (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value,
        })
        setError(
            validator({
                ...input, [e.target.name]: e.target.value,
            })
        )
        
    };
    const validator = (input) => {
        const errors = {};
        const scores = Number(input.score);
        const times = Number(input.time)
        if(!input.name) errors.name = "Name of the recipe is necessary";
        else if(/[^A-Za-z0-9 ]+/g.test(input.name)){
            errors.name= "Name cannot contain special characters"
        }
        if(!input.credits) errors.credits = "Credits are necessary";
        else if(/[^A-Za-z0-9 ]+/g.test(input.credits)){
            errors.credits= "Credits cannot contain special characters"
        }
        if(!input.source) errors.source = "Source is necessary";
        else if(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(input.source)){
            errors.source= "Source cannot contain special characters"
        }
        if(!input.time) errors.time = "Time is necessary";
        else if(times >999 || times < 1 ){
            errors.time= "Time must be only numbers, and the limit will be four digits"
        }
        if(!input.summary) errors.summary = "Summary is necessary";
        else if(input.summary.length === 256) errors.summary = "you have exceed the limit of the summary"        
        if(!input.steps) errors.steps = "Steps are necessary";
        else if(input.steps.length === 256) errors.steps = "you have exceed the limit of the steps"

        
        if(scores > 100 || scores < 1)errors.score="this value must be between 1-100";

        return errors;
    };


    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);


    const handleSelect = (e) => {
        setInput((state)=>{
            console.log(state)
            if(e.target.name === "diets"){
                if(!state.diets.includes(e.target.value)){
                return {...state, diets: [...state.diets, e.target.value]}}
                else{
                    return {...state}
                }
            } else{
                return {
                    ...state, [e.target.name]: e.target.value
                }
            }
        })
    };

    const handleSubmit= (e) => {
        e.preventDefault();
        if(!input.name || !input.credits || !input.score || !input.source || !input.steps || !input.summary || !input.time) return alert("please make sure to have filled at leats name, in case you dont want to fill the others, do as you want");
        dispatch(createRecipe(input));
        alert("nice, you have acomplished this form and now we have that recipe");
        setInput({
        credits: "",
        diets: [],
        name: "",
        score: "",
        source: "",
        steps: "",
        summary: "",
        time: ""
        })};
    const handleDelete= (e) => {
        setInput({
            ...input, diets: input.diets.filter((diet) => diet !== e )
        })
    };


    return (
        <div className="container">
        <form className="formcard" onSubmit={(e) => handleSubmit(e)}>
            <div className="title">Welcome!</div>
            <div className="subtitle">Let's create your recipe</div>
            <div className="input-container ic1">
                <input id="name" name="name" type="text" className="input" value={input.name} onChange={(e) => handleChange(e)} />
                <div className="cut" />
                <label htmlFor="name" className="placeholder">Recipe</label>
                <div>
                {error.name && <p>{error.name}</p>}
                </div>
            </div>
            <div className="input-container ic2">
                <input id="credits" name="credits" className="input" type="text" value={input.credits} onChange={(e) => handleChange(e)} />
                <div className="cut" />
                <label htmlFor="credits" className="placeholder">Name</label>
                <div>
                {error.credits && <p>{error.credits}</p>}
                </div>
            </div>
            <div className="input-container ic2">
                <input className="input" id="source" name="source" type="text" value={input.source} onChange={(e) => handleChange(e)} />
                <div className="cut" />
                <label htmlFor="source" className="placeholder">Website</label>
                <div>
                {error.source && <p>{error.source}</p>}
                </div>
            </div>
            <div className="input-container ic2">
                <input className="input" id="time" name="time" type="number" value={input.time} onChange={(e) => handleChange(e)} />
                <div className="cut" />
                <label htmlFor="time" className="placeholder">Duration{"("}m{")"}</label>
                <div>
                {error.time && <p>{error.time}</p>}
                </div>
            </div>
            <div className="input-container ic2">
                <input className="input" id="score" name="score" type="number" value={input.score} onChange={(e) => handleChange(e)} />
                <div className="cut" />
                <label htmlFor="score" className="placeholder">Healthscore</label>
                <div>
                {error.score && <p>{error.score}</p>}
                </div>
            </div>
            <div className="input-container ic2">
                <input className="input" id="summary" name="summary" type="textarea" value={input.summary} onChange={(e) => handleChange(e)} />
                <div className="cut" />
                <label htmlFor="summary" className="placeholder">Summary</label>
                <div>
                {error.summary && <p>{error.summary}</p>}
                </div>
            </div>
            <div className="input-container ic2">
                <input className="input" id="steps" name="steps" type="textarea" value={input.steps} onChange={(e) => handleChange(e)} />
                <div className="cut" />
                <label htmlFor="steps" className="placeholder">Steps</label>
                <div>
                {error.steps && <p>{error.steps}</p>}
                </div>
            </div>
            <div className="input-container ic2">
                <select className="input" id="diets" name="diets" onChange={(e) => handleSelect(e)}>
                <option key="null"></option>
                    {diets.length && diets.map((dieta) =>(
                        <option value={dieta.name} key={dieta.id}>{dieta.name}</option>
                    ))}
                </select>
                <div className="cut" />
                <label htmlFor="diets" className="placeholder">Diets</label>
                
            </div>
            <div className="selectedDiets">
                {input.diets ? input.diets.map((diet, index) => (
                    <button className="erase" key={index} onClick={() => handleDelete(diet)}>
                    <span className="iconie"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg></span><span className="textie">{diet}</span></button>
                )): alert("this one has already been selected")}
            </div>
            <div>
                <button className="submit" type="submit">Add recipe</button>
            </div>
        </form>        
        </div>
    )
}
