const  DataTypes  = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    credits:{
      type: DataTypes.STRING,
      defaultValue: "The user who posted this recipe was a little lazy and aparently is anonymous"
    },
    source:{
      type: DataTypes.STRING,
      defaultValue: "The one who posted this did not want to get that famous:p"
    },
    time:{
      type: DataTypes.STRING,
      defaultValue: "If time is not here, maybe the summary may tell you how much it takes"
    },
    cheap:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "''"
    },
    summary: {
      type: DataTypes.STRING,
      defaultValue: "The creator of this recipe aparently could not write any summary, sorry:p", 
    },
    steps: {
      type: DataTypes.STRING,
      defaultValue: "Aparently the creator was not able to give us the secret of this recipe, sorry:p" 
    }
  },{timestamps: false,});
};
