const { Diet } = require("../db");

const getDiets = async () => {
  let dbDiets = await Diet.findAll();
  if (!dbDiets.length) {
    const diets = [
      { id: 1, name: "gluten free" },
      { id: 2, name: "ketogenic" },
      { id: 3, name: "vegetarian" },
      { id: 4, name: "lacto ovo vegetarian" },
      { id: 5, name: "vegan" },
      { id: 6, name: "pescetarian" },
      { id: 7, name: "paleolithic" },
      { id: 8, name: "primal" },
      { id: 9, name: "fodmap friendly" },
      { id: 10, name: "whole 30" },
      { id: 11, name: "dairy free" },
    ];
    const setDiets = await Diet.bulkCreate(diets);
    dbDiets=  [...setDiets];
  }

  //?The commented function was used to charge all the diets in the database in order to have diets in our call:D
  return dbDiets;
};

module.exports = { getDiets };
