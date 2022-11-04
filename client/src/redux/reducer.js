import { GET_DIETS, GET_RECIPES, CREATE_RECIPE, CLEAN_DETAIL,
    GET_DETAILS, ORDER_NAMES, FILTER_DIETS, SET_PAGE_INDEX, ORDER_HSCORE, SEARCH } from "./actionTypes";

const initialState = {
    recipes: [],
    allRecipes:[],
    diets: [],
    details: {},
    pageIndex: 1
};

export default function rootReducer(state=initialState, action) {
    switch(action.type){
        case GET_RECIPES:
            return {...state, recipes: action.payload, allRecipes: action.payload};
        case GET_DIETS:
            return {...state, diets: action.payload};
        case CREATE_RECIPE:
            return {...state}
        case SEARCH:
            return {...state, recipes:action.payload};
        case SET_PAGE_INDEX:
            return {...state, pageIndex: action.payload};
        case GET_DETAILS:
            return {...state, details: action.payload};
        case CLEAN_DETAIL:
            return {...state, details: {}};
        case ORDER_NAMES:
            let ordered = action.payload === true 
            ? state.recipes?.sort((a, b) => a.name.localeCompare(b.name)) 
            : state.recipes?.sort((a,b) => b.name.localeCompare(a.name));
            return {...state, recipes: ordered,};
        case ORDER_HSCORE:
            let sorted = action.payload === true 
            ? state.recipes?.sort((a,b)=>{
                if(a.score > b.score) return 1;
                if(b.score > a.score) return -1;
                return 0;
            }) : state.recipes?.sort((a,b) =>{
                if(a.score > b.score) return -1;
                if(b.score > a.score) return 1;
                return 0;
            });
            return{
                ...state, recipes: sorted,
            };
        case FILTER_DIETS:
            let filtered = action.payload === "All" 
            ? state.allRecipes
            : state.allRecipes.map((rec) => {
                let info;
                for(let key in rec.diets){
                    if(rec.diets[key].name === action.payload) info = rec;
                    else if(rec.diets[key] === action.payload) info = rec;
                }
               
                return info;
            }).filter((e)=> e)
            return {...state, recipes: filtered}
        default:
            return {...state};
    }
}