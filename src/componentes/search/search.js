import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const [search, setSearch]=useState("");
    const history = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        history(`/Movies-App/search/${search}`)
        setSearch("");
        window.scroll({
            top: 0
          });
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