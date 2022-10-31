import { GET_DIETS, GET_RECIPES, CREATE_RECIPE, CLEAN_DETAIL, GET_DETAILS, ORDER_NAMES, FILTER_DIETS } from "./actionTypes";

const initialState = {
    recipes: [],// lo que tengamos en el get del back(104{})
    diets: [],
    filter:[],
    details: {}
};//!hacer ordenamiento de healthscore

export default function rootReducer(state=initialState, action) {
    switch(action.type){
        case GET_RECIPES:
            return {...state, recipes: action.payload};
        case GET_DIETS:
            return {...state, diets: action.payload};
        case CREATE_RECIPE:
            return {...state}
        case GET_DETAILS:
            return {...state, details: action.payload}
        case CLEAN_DETAIL:
            return {...state, details: {}}
        case ORDER_NAMES:
            let ordered = action.payload === true 
            ? state.recipes?.sort((a, b) => a.name.localeCompare(b.name)) 
            : state.recipes?.sort((a,b) => b.name.localeCompare(a.name));
            return {...state, recipes: ordered,}
        case FILTER_DIETS:
            let filtered = action.payload === "All" 
            ? state.recipes//recipes tiene a todos
            : state.recipes.map((rec) => {//pokemons:[2{}]
                let info;
                for(let key in rec.diets){
                    if(rec.diets[key].name === action.payload) info = rec;
                    else if(rec.diets[key] === action.payload) info = rec;
                }
               
                return info;
            }).filter((e)=> e)//pokemons: [e{...},distintos{undef}]
            return {...state, filter: filtered}
        default:
            return {...state};
    }
}