import { GET_RECIPES, GET_DIETS, CLEAN_DETAIL, GET_DETAILS, ORDER_NAMES, FILTER_DIETS } from "./actionTypes";
import axios from "axios";

export const getRecipes = () => {
    return function(dispatch){
         try{
            axios.get("http://localhost:3001/recipes")
            .then((response) => response.data)
            .then((data) => dispatch({type: GET_RECIPES, payload: data}))
         }
         catch(err){
            console.log(err)
         }
    }
};

export const getDiets = () => {
    return function(dispatch){
        try{
            axios.get("http://localhost:3001/diets")
            .then((response) => response.data)
            .then((data) => dispatch({type: GET_DIETS, payload: data}))
        }
        catch(err){
            console.log(err)
        }
    }
};
export const createRecipe = (payload) =>{
    return function(dispatch){
        try{
            axios.post("http://localhost:3001/recipes", payload)
        } catch(err){
            console.log(err)
        }
    }
};

export const cleanDetail = () => {
    return {type: CLEAN_DETAIL}
};

export const getDetails = (id) => {
    return function(dispatch){
         try{
            axios.get(`http://localhost:3001/recipes/${id}`)
            .then((response) => response.data)
            .then((data) => dispatch({type: GET_DETAILS, payload: data}))
         }
         catch(err){
            console.log(err)
         }
    }
};

export const orderNames = (payload) =>{
    return {
        type: ORDER_NAMES,
        payload,
    }
};

export const filterDiets = (payload)=>{
    if(payload === "All"){
       return getRecipes();
    }else{
    return {
        type: FILTER_DIETS,
        payload,
    }}
}