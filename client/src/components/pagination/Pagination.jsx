import {React, useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setIndex } from "../../redux/actions"
import "./styles.css"


export const Pagination = (props) => {
    const dispatch = useDispatch();
    const [pages, setPages] = useState([0]);
    const [page, setPage] = useState();
    

    
    
    
    const [ending, setEnd] = useState(props.pags);

    const pageCount = Math.ceil(props.quantity/9);


    const paginate = (index) =>{
        setPage(index)
        
    
    let newPages = [], start = 0

    if(index > (props.pags -1)/2){
        start = index - (props.pags-1)/2;
        setEnd(start + props.pags);
    }
    if(index > pageCount - (props.pags + 1)/2){
        start = pageCount - props.pags;
        setEnd(pageCount);
    }
    for(let i = start; i< ending; i++){
        newPages.push(i);
    }

    setPages(newPages);
}
    useEffect(() => {
        paginate(0)
    },[]);

    useEffect(() => {
        dispatch(setIndex(page + 1))
    }, [dispatch, page]);


    console.log(pages)
    return(
        <div className="pagination">
            <button disabled={page === 0} onClick={() => paginate(0)} className="material-symbols-outlined" type="button"><i className="fa-solid fa-backward-step"></i></button>
            {pages.length ? pages.map((pag)=>(
                <button className={pag === page ? "active": ""} onClick={()=> paginate(pag)} key={pag} type="button" >{pag+1}</button>
            )): (<p>...</p>)}
            <button disabled={page === pageCount-1} onClick={()=> paginate(pageCount-1)} className="material-symbols-outlined" type="button" ><i className="fa-solid fa-forward-step"></i></button>
        </div>
    );
};