const { Diet } = require("../db");
const axios = require("axios");


const getDiets = async() => {
    //         const diets = [
    //     {id: 1, name: "gluten free"},
    //     {id: 2, name: "ketogenic"},
    //     {id: 3, name: "vegetarian"},
    //     {id: 4, name: "lacto vegetarian"},
    //     {id: 5, name: "ovo vegetarian"},
    //     {id: 6, name: "lacto ovo vegetarian"},
    //     {id: 7, name: "vegan"},
    //     {id: 8, name: "pescetarian"},
    //     {id: 9, name: "paleolithic"},
    //     {id: 10, name: "primal"},
    //     {id: 11, name: "fodmap friendly"},
    //     {id: 12, name: "whole 30"},
    //     {id: 13, name: "dairy free"}    ]
    // const setDiets =  await Diet.bulkCreate(diets);
    // return setDiets;}
//?The commented function was used to charge all the diets in the database in order to have diets in our call:D
const dbDiets = await Diet.findAll()
return dbDiets; 
}


module.exports = {getDiets};