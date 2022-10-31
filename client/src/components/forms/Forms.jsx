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
        image: "",
        summary: "",
        steps: "",
        diets: []
    });
    const [error, setError] = useState({});

    const handleChange= (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value,
        })//TODO:pendiente armar validador para errores
        setError(
            validator({
                ...input, [e.target.name]: e.target.value,
            })
        )
        
    };
    const validator = (input) => {
        const errors = {};
        const scores = Number(input.score);
        if(!input.name) errors.name = "Name is necessary";
        else if(/[^A-Za-z0-9 ]+/g.test(input.name)){
            errors.name= "Name cannot contain special characters"
        }
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
                return {...state, diets: [...state.diets, e.target.value]}
            } else{
                return {
                    ...state, [e.target.name]: e.target.value
                }
            }
        })
    };//post {name: papas, cheap: true, diets: vegan, credits: "", }

    const handleSubmit= (e) => {
        e.preventDefault();
        if(!input.name) return alert("please make sure to have filled at leats name and cheap, in case you dont want to give the other, do as you want");
        dispatch(createRecipe(input));
        alert("nice, you have acomplished this form and now we have that recipe");
        setInput({
        credits: "",
        diets: [],
        image: "",
        name: "",
        score: "",
        source: "",
        steps: "",
        summary: "",
        time: ""
        })
    };
    const handleDelete= (e) => {
        setInput({
            ...input, diets: input.diets.filter((diet) => diet !== e )
        })
    };


    return (
        <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <input name="name" type="text" value={input.name} placeholder="enter your recipe`s name" onChange={(e) => handleChange(e)} />
                <div>
                {error.name && <p>{error.name}</p>}
                </div>
            </div>
            <div>
                <input name="credits" type="text" value={input.credits} placeholder="here you can submit your name" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                <input name="source" type="text" value={input.source} placeholder="here you can put an url" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                <input name="time" type="number" value={input.time} placeholder="now this one can have the recipe`s time" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                <input name="score" type="number" value={input.score} placeholder="you can give us the health score" onChange={(e) => handleChange(e)} />
                {error.score && <p>{error.score}</p>}
            </div>
            <div>
                <input name="image" type="text" value={input.image} placeholder="enter an image url of the recipe" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                <input name="summary" type="textarea" value={input.summary} placeholder="enter a summary of the recipe" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                <input name="steps" type="textarea" value={input.steps} placeholder="please give us steps for the recipes" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                <select name="diets" onChange={(e) => handleSelect(e)}>
                <option key="null"></option>
                    {diets.length && diets.map((dieta) =>(
                        <option value={dieta.name} key={dieta.id}>{dieta.name}</option>
                    ))}
                </select>
                
            </div>
            <div>
                <button type="submit">Add recipe</button>
            </div>
        </form>
        <div>
            {input.diets ? input.diets.map((diet, index) => (
                <button key={index} onClick={() => handleDelete(diet)}>
                    {diet} <span></span>
                </button>
            )): alert("this one has already been selected")}
        </div>
        </div>
    )
}//!recordar hacer el mapeo de las seleccionadas
