const { Recipe, Diet, Op} = require("../db");
const axios = require("axios");
const { KEY, KEY2 } = process.env;


const getRecipeByName = async(name) =>{
    try{
        const namedApi = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);
        const { results } = namedApi.data;
        let namedApiRecipes = [];
        if(results.length > 0){
            results.map((rec) => {
                namedApiRecipes.push({
                    id: rec.id,
                    name: rec.title,
                    credits: rec.creditsText,
                    score: rec.healthScore,
                    source: rec.sourceUrl,
                    time: rec.readyInMinutes,
                    cheap: rec.cheap,
                    summary: rec.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
                    image: rec.image,
                    steps: (rec.analyzedInstructions[0] && rec.analyzedInstructions[0].steps?rec.analyzedInstructions[0].steps.map(item=>item.step).join(" || "):'In this recipe, there are not steps'),
                    diets: rec.diets? rec.diets.map((diet) => diet) : "This one has no kind of diet:p"

                })
            })
        }
        let search;
        if(namedApiRecipes.length){
            search = namedApiRecipes.filter((rec) => rec.name.includes(name) === true)
        }
        const dbRecipes = await Recipe.findAll({
            
            include: [
                {
                    model: Diet,                
                    through: { attributes: []},
                },
            ],
        });
        
        const namedRecipe = dbRecipes.filter((recipe) =>recipe.name.includes(name.toLowerCase()))

        // return [...namedApiRecipes, ...namedRecipe];
       if(!search.length && !namedRecipe) throw new Error("not found recipe");

    }
    catch(err){return err.message}
}

module.exports = getRecipeByName;

