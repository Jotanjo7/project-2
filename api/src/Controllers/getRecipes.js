const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { KEY, KEY2 } = process.env;


const getRecipes = async() => {
    const data = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=100`);
    const apiRecipes = data.data.results;
    const formatRecipes = apiRecipes.map((rec)=> ({
        id: rec.id,
        name: rec.title,
        credits: rec.creditsText,
        score: rec.healthScore,
        source: rec.sourceUrl,
        dish: rec.dishTypes,
        time: rec.readyInMinutes,
        cheap: rec.cheap,
        summary: rec.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        image: rec.image,
        steps: (rec.analyzedInstructions[0] && rec.analyzedInstructions[0].steps?rec.analyzedInstructions[0].steps.map(item=>item.step).join(" || "):'In this recipe, there are not steps'),
        diets: rec.diets? rec.diets.map((diet) => diet) : "This one has no kind of diet:p"
    }));
    
    const dbRecipes = await Recipe.findAll({
        include: [
            {
                model: Diet,                
                through: { attributes: []},
            },
        ],
    });
//!agregar validacion de vbase de datos y api
    return [...formatRecipes, ...dbRecipes]
    
}

module.exports= getRecipes;