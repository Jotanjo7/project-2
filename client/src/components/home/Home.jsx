import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, orderNames, filterDiets, getDiets, orderHScore } from "../../redux/actions"
import  Card  from "../card/Card"
import { Pagination } from "../pagination/Pagination";

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
        dispatch(filterDiets(e.target.value))        
    }
    const handleScore = (e) => {
        setScore(!score);
        dispatch(orderHScore(score))
    }

    return (
        <div>
            <div>
                <button onClick={(e) => handleSort(e)}>ASC/DESC</button>
            </div>
            <div>
                <button onClick={(e) => handleScore(e)}>{score ?(<i>lower scores</i>):(<i>higher scores</i>)}</button>
            </div>
            <div>
                <select className="selections" onChange={(e) => handleFilter(e)}>
                    <option value="All">Diets: All</option>
                    {diets?.map((diet) => (
                        <option value={diet.name} key={diet.id} >{diet.name}</option>
                        ))
                        }

                </select>
            </div>
            {currentRecipes ? currentRecipes.map((recipe) => (
                <Card key={recipe.id} name={recipe.name} score={recipe.score} id={recipe.id} time={recipe.time} image={recipe.image}/>
            )) : (<h3>Waiting for recipes:P</h3>)}
        <div>
                {recipes.length ? (<Pagination pags={Math.ceil(recipes.length/9)} quantity={recipes.length}/>) : (<h1>Loading...</h1>)}
        </div>
        </div>
            
    );
}

export default Home;
