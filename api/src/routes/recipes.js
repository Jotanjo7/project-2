const express = require("express");
const router = express.Router();
const getRecipes = require("../controllers/getRecipes");
const createRecipe = require("../controllers/createRecipe");
const getRecipeByName = require("../controllers/getRecipeByName");
const deleteRecipe = require("../controllers/deleteRecipe");

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipes = await getRecipes();
    const recipeId = recipes.filter((rec) => rec.id == id);
    if(recipeId.length){
    return res.send(recipeId);
  } throw new Error("no recipes with that ID");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/recipes", async (req, res) => {
  const { name, erase } = req.query;

  if (name) {
    try {
      const namedRecipe = await getRecipeByName(name);
      res.send(namedRecipe);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    try {
      const recipes = await getRecipes();
      res.send(recipes);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
});

router.post("/recipes", async (req, res) => {
  try {
    const {
      name,
      credits,
      score,
      source,
      time,
      cheap,
      image,
      summary,
      steps,
      diets,
    } = req.body;
    const createdRecipe = await createRecipe(
      name,
      credits,
      score,
      source,
      time,
      cheap,
      image,
      summary,
      steps,
      diets
    );
    res.send(createdRecipe);
  } catch (err) {
    console.log(err);
    res.status(400).send("error al crear receta", err);
  }
});
router.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteRecipe(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// router.patch("/recipes/:id", async(req, res) => {
//   const { id } = req.params;
//   const { credits, diets, name, score, source, steps, summary, time } = req.body;

// })!ongoing

module.exports = router;
