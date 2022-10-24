const express = require("express");
const { Recipe } = require("../db");
const router = express.Router(); 
const  getRecipes  = require("../Controllers/getRecipes");
const  createRecipe  = require("../Controllers/createRecipe");
const getRecipeByName = require("../Controllers/getRecipeByName");
const getRecipeById = require("../Controllers/getRecipeById");


router.get("/recipes/:id", async(req, res) =>{
  const { id }  = req.params;
  try{
    const recipeId = await getRecipeById(id);
    res.send(recipeId);
  }
  catch(err){
    res.status(400).send(err.message);
  }
})

router.get("/recipes", async(req, res)=> {
    const {name} = req.query;
    if(name){
        try{
            const namedRecipe = await getRecipeByName(name);
            res.send(namedRecipe);
        }catch(err){
            res.status(400).send(err.message);
        }

    }
    else{
        try{
        const recipes = await getRecipes();
        res.send(recipes)
        }catch(err){ 
        res.status(400).send(err.message)
        }}
});

router.post("/recipes", async(req, res) => {
    try{
        const { name, credits, source, time, cheap, image, summary, steps, diets} = req.body;
        const createdRecipe = await createRecipe(name, credits, source, time, cheap, image, summary, steps, diets);
        res.send(createdRecipe)
}catch(err){
    console.log(err)
}

})


module.exports= router;