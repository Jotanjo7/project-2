import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, orderNames, filterDiets, getDiets } from "../../redux/actions"
import  Card  from "../card/Card"

const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);
    const diets = useSelector((state) => state.diets);

    console.log(recipes)
    const [order, setOrder] = useState(false);
    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getDiets())
    }, [dispatch]);

    const handleSort = (e) => {
        setOrder(!order);
        dispatch(orderNames(order))
    }
    const handleFilter = (e) =>{
        dispatch(filterDiets(e.target.value))        
    }

    return (
        <div>
            <div>
                <button onClick={(e) => handleSort(e)}>ASC/DESC</button>
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
            {recipes ? recipes.map((recipe) => (
                <Card key={recipe.id} name={recipe.name} id={recipe.id} time={recipe.time} image={recipe.image}/>
            )) : <h1>Loading</h1>}
        </div>
    );
}

export default Home;
