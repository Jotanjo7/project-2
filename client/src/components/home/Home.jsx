import "./home.css"
import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, orderNames, filterDiets, getDiets, orderHScore, setIndex } from "../../redux/actions"
import  Card  from "../card/Card"
import { Pagination } from "../pagination/Pagination";
import { SearchBar } from "../search bar/SearchBar";

const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);
    const diets = useSelector((state) => state.diets);
    const index = useSelector((state) => state.pageIndex);
    
    
    const pageRecipes = 9;
    const lastRecipe= index * pageRecipes;
    const firstRecipe= lastRecipe - pageRecipes;
    useEffect(() => {
        dispatch(getRecipes())        
        dispatch(getDiets())
    }, []);

    
    const currentRecipes = recipes.slice(firstRecipe, lastRecipe);

    
    const [order, setOrder] = useState(true);
    const [score, setScore] = useState(true);
    
    console.log()
    const handleSort = (e) => {
        setOrder(!order);
        dispatch(orderNames(order))
    }
    const handleFilter = (e) =>{
        dispatch(setIndex(1))     
        dispatch(filterDiets(e.target.value))
    }
    const handleScore = (e) => {
        setScore(!score);
        dispatch(orderHScore(score))
    }

    return (
        <div>
        <div className="optionsbar">
            <div className="bar">
                <SearchBar />
            </div>
            <div className="options">
                <div>
                    <button onClick={(e) => handleSort(e)}>{order ?(<i className="fa-solid fa-arrow-up-wide-short">A-Z</i>):(<i className="fa-solid fa-arrow-down-wide-short">Z-A</i>)}</button>
                </div>
                <div>
                    <button onClick={(e) => handleScore(e)}>{score ?(<i className="fa-solid fa-arrow-up-wide-short">SCORE</i>):(<i className="fa-solid fa-arrow-down-wide-short">SCORE</i>)}</button>
                </div>
                <div>
                    <select className="selections" onChange={(e) => handleFilter(e)}>
                        <option value="All">Diets: All</option>
                        {diets?.map((diet) => (
                        <option value={diet.name} key={diet.id} >{diet.name}</option>))
                        }
                    </select>
                </div>
            </div>
        </div>

        <div className="wrapper">
            {currentRecipes ? currentRecipes.map((recipe) => (                
                <Card key={recipe.id} diets={recipe.diets} name={recipe.name} score={recipe.score} id={recipe.id} time={recipe.time} image={recipe.image}/>
            )) : (<h3>Waiting for recipes:P</h3>)}
        </div>
            <div className="pags">
                {recipes && recipes.length 
                ? (<Pagination pags={Math.ceil(recipes.length/9)} quantity={recipes.length}/>) 
                : (<div class="loader"><div></div></div>)}
            </div>
        </div>
            
    );
}

export default Home;
