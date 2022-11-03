import {React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setIndex } from "../../redux/actions"
import "./styles.css"


export const Pagination = (props) => {
    const dispatch = useDispatch();
    const [pages, setPages] = useState([0]);
    const [page, setPage] = useState();
    const recipes = useSelector((state)=> state.recipes)
    

    
    
    
    

    const pageCount = Math.ceil(props.quantity/9);


    const paginate = (index) =>{
        setPage(index)
        let allPages= [];
        for(let i = 0; i < pageCount ; i++){
            allPages.push(i)
        }
        setPages(allPages)
    }
    useEffect(() => {
        paginate(0)
    },[recipes]);

    useEffect(() => {
        dispatch(setIndex(page + 1))
    }, [dispatch, page]);

    



    return(
        <div className="pagination">
            <button disabled={page === 0} onClick={() => paginate(0)} className="material-symbols-outlined" type="button"><i className="fa-solid fa-backward-step"></i></button>
            {pages.length ? pages.map((pag)=> (
                <button className={pag === page ? "active": ""} onClick={()=> paginate(pag)} key={pag} type="button" >{pag+1}</button>
            )): (<p>...</p>)}
            <button disabled={page === pageCount-1} onClick={()=> paginate(pageCount-1)} className="material-symbols-outlined" type="button" ><i className="fa-solid fa-forward-step"></i></button>
        </div>
    );
};