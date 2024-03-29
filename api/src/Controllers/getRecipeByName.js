const { Recipe, Diet, Op} = require("../db");
const axios = require("axios");
const {KEY} = process.env;


const getRecipeByName = async(name) =>{
    try{
        const namedApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true&query=${name}`);
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
       if(!namedApiRecipes && !namedRecipe) throw new Error("there's no recipe in here");
       if(!namedApiRecipes && namedRecipe.length) return [...namedRecipe];
       if(namedApiRecipes && !namedRecipe) return [...namedApiRecipes];
       
       return [...namedApiRecipes, ...namedRecipe]; 

    }
    catch(err){return err.message}
}

module.exports = getRecipeByName;

