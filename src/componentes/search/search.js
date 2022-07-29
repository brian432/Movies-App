import React, { useState } from "react";
import { scroll } from "../../services/scroll";
const Search = ({onSubmit}) => {
    const [search, setSearch]=useState("");
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        onSubmit(search)
        setSearch("");
        scroll()
    }
    const handleChange=(e)=>{
        setSearch(e.target.value);
    }
    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <input type="search" name="search" onChange={handleChange} minLength="3" value={search} placeholder="Buscar..." required />
            <button type="submit">Buscar</button>
        </form>
    )
}
export default React.memo(Search)