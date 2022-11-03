import "./Search.css";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { searching } from "../../redux/actions"


export const SearchBar = () =>{
const dispatch = useDispatch();
const [find, setFind] = useState("");

const handleInputChange = (e) => {
    setFind(e.target.value);
};


const handleChange = (e) => {
    if(e.key === "Enter"){
        dispatch(searching(e.target.value));
        setFind("");
    }
};


    return(
        <div className="search-box">
        <button className="btn-search" ><i className="fas fa-search"></i></button>
        <input type="text" value={find} className="input-search" placeholder="Let's look for a recipe" onChange={(e) => handleInputChange(e)} onKeyDown={(e) => handleChange(e)}/>
      </div>
    )
}