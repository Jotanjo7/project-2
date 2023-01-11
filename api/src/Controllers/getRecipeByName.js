const { Recipe, Diet, Op} = require("../db");
const axios = require("axios");


const getRecipeByName = async(name) =>{
    try{
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true&query=${name}`);
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
            search = namedApiRecipes.filter((rec) => rec.name.includes(name) === true || rec.name.includes(name.slice(1)) === true)
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
       if(!search.length && !namedRecipe.length) throw new Error("not found recipe");
       else if(!search.length && namedRecipe) return [...namedRecipe];
       else return [...search, ...namedRecipe]

    }
    catch(err){return err.message}
}

module.exports = getRecipeByName;

