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
    const recipes = await getRecipes();
    const recipeId = recipes.filter((rec) => rec.id == id);
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
            res.status(400).send(err);
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
        const { name, credits, score, source, time, cheap, image, summary, steps, diets} = req.body;
        const createdRecipe = await createRecipe(name, credits, score, source, time, cheap, image, summary, steps, diets);
        res.send(createdRecipe)
}catch(err){
    console.log(err)
    res.status(400).send("error al crear receta", err)
}

})


module.exports= router;