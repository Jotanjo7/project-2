const { Recipe, Diet} = require("../db");


const createRecipe = async( name, credits, source, time, cheap, image, summary, steps, diets ) => {
    const recipe = await Recipe.create({name, credits, source, time, cheap, image, summary, steps});

    const recipeDiets = await Diet.findAll({
        where: {
            name: diets,
        },
    });

    recipe.addDiet(recipeDiets);
    return recipe;
}

module.exports = createRecipe;