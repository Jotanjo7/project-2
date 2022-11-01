const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { KEY, KEY2 } = process.env;

const getRecipeById = async(id) => {
   if(id.length < 11){ try{
        const idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY2}&&addRecipeInformation=true`)
        const  { data }  = idApi;
        return{
            id: data.id,
        name: data.title,
        credits: data.creditsText, 
        score: data.healthScore,
        source: data.sourceUrl,
        cheap: data.cheap,
        summary: data.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        image: data.image,
        steps: (data.analyzedInstructions[0] && data.analyzedInstructions[0].steps?data.analyzedInstructions[0].steps.map(item=>item.step).join(" || "):'In this recipe, there are not steps'),
        diets: data.diets? data.diets.map((diet) => diet) : "This one has no kind of diet:p"
        }
        
    }
    catch(err){
        console.log(err);
    }}
    else{
        try{
        const dbRecipes = await Recipe.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Diet,                
                    through: { attributes: []},
                },
            ],
        });
        return {
            id: dbRecipes.dataValues.id,
            name: dbRecipes.dataValues.name,
            credits: dbRecipes.dataValues.credits,
            score: dbRecipes.dataValues.score,
            source: dbRecipes.dataValues.source,
            cheap: dbRecipes.dataValues.cheap,
            image: dbRecipes.dataValues.image,
            summary: dbRecipes.dataValues.summary,
            steps: dbRecipes.dataValues.steps,
            diets: dbRecipes.dataValues.diets.map((diet) => diet.name)
        }

        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = getRecipeById;