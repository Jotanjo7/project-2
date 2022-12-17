const { Recipe } = require("../db");

const deleteRecipe = (id) => {
    try{
        Recipe.destroy({
            where:{
                id
            }
        })
    return "this recipe does not exist anymore";
    }catch(error){
        return error;
    }
}

module.exports= deleteRecipe;