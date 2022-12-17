const { Recipe, Diet } = require("../db");
const axios = require("axios");


const getRecipes = async() => {
    const data = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);
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