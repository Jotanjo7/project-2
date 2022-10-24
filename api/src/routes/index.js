const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const recipes = require("./recipes");
const diets = require("./diets");


router.use("/", recipes);
router.use("/", diets);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
