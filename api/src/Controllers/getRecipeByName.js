const { Recipe, Diet} = require("../db");
const axios = require("axios");
const { KEY, KEY2 } = process.env;


const getRecipeByName = async(name) =>{
    let recipes = await getRecipes();
    try{
        for(let recipe of recipes){

    }
}catch(err){console.log(err)}
}



