const express = require("express");
const { Diet } = require("../db");
const router = express.Router();
const { getDiets } = require("../Controllers/getDiets")


router.get("/diets", async(req, res) => {
    try{
        const diets = await getDiets();
        res.send(diets);
    }catch(err){
        res.status(400).send(err.message)
    }
});


module.exports = router;