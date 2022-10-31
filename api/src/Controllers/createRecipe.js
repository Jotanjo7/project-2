const { Recipe, Diet} = require("../db");


const createRecipe = async( name, credits, score, source, time, cheap, image, summary, steps, diets ) => {
    const recipe = await Recipe.create({name, credits, score, source, time, cheap, image, summary, steps});

    const recipeDiets = await Diet.findAll({
        where: {
            name: diets,
        },
    });

    recipe.addDiet(recipeDiets);
    console.log(recipe)
    console.log(recipeDiets)
    return recipe;
}

module.exports = createRecipe;